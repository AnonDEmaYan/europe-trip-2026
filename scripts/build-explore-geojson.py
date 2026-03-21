#!/usr/bin/env python3
"""
Build public/data/explore-places.geojson from Nominatim (OSM).
Usage: python3 scripts/build-explore-geojson.py
Respect Nominatim usage policy: max 1 req/s, identify via User-Agent.
"""
from __future__ import annotations

import json
import os
import ssl
import time

# macOS / some CI images lack cert bundle for Nominatim; rebuild script only.
if os.environ.get("NOMINATIM_INSECURE", "1") == "1":
    ssl._create_default_https_context = ssl._create_unverified_context

import urllib.parse
import urllib.request

USER_AGENT = "EuropeTripSite/1.0 (private trip planner)"

# (id, name, city, category, nominatim_query)
PLACES: list[tuple[str, str, str, str, str]] = [
    # Barcelona
    ("bcn-satan", "Satan's Coffee Corner", "barcelona", "coffee", "Satan's Coffee Corner, Barcelona"),
    ("bcn-nomad", "Nomad Coffee Passatge Sert", "barcelona", "coffee", "Nomad Coffee Lab Passatge Sert Barcelona"),
    ("bcn-threemarks", "Three Marks Coffee", "barcelona", "coffee", "Three Marks Coffee Barcelona"),
    ("bcn-bardelpla", "Bar del Pla", "barcelona", "food", "Bar del Pla Barcelona"),
    ("bcn-quimet", "Quimet & Quimet", "barcelona", "food", "Quimet Quimet Barcelona"),
    ("bcn-vinitus", "Vinitus", "barcelona", "food", "Vinitus Barcelona"),
    ("bcn-disfrutar", "Disfrutar", "barcelona", "food", "Disfrutar Barcelona"),
    ("bcn-cova", "La Cova Fumada", "barcelona", "food", "La Cova Fumada Barcelona"),
    ("bcn-canmano", "Can Maño", "barcelona", "food", "Can Maño Barceloneta"),
    ("bcn-teresa", "Teresa Carles", "barcelona", "food", "Teresa Carles Carrer Jovellanos Barcelona"),
    ("bcn-flax", "Flax & Kale", "barcelona", "food", "Flax and Kale Barcelona"),
    ("bcn-raval-indian", "Raval Indian (area)", "barcelona", "spicy", "Carrer de Sant Pau, Raval Barcelona"),
    ("bcn-thai-born", "Thai Born area", "barcelona", "spicy", "Princess Thai Barcelona Born"),
    ("bcn-mexican", "Mexican BCN search", "barcelona", "spicy", "Taco Alto Barcelona"),
    ("bcn-sichuan", "Sichuan Barcelona", "barcelona", "spicy", "Sichuan Restaurant Barcelona"),
    ("bcn-codorniu", "Codorníu", "barcelona", "winery", "Codorniu Sant Sadurni d'Anoia"),
    ("bcn-freixenet", "Freixenet", "barcelona", "winery", "Freixenet Sant Sadurni d'Anoia"),
    ("bcn-torres", "Familia Torres Pacs", "barcelona", "winery", "Bodegas Torres Pacs Penedes"),
    ("bcn-jeanleon", "Jean Leon", "barcelona", "winery", "Jean Leon winery Penedes"),
    ("bcn-santsadurni-st", "Sant Sadurní station", "barcelona", "winery", "Sant Sadurni d'Anoia railway station"),
    ("bcn-bunkers", "Bunkers del Carmel", "barcelona", "wander", "Bunkers del Carmel Barcelona"),
    ("bcn-born", "El Born", "barcelona", "wander", "El Born Barcelona neighborhood"),
    ("bcn-gracia", "Gràcia", "barcelona", "wander", "Gracia Barcelona"),
    ("bcn-zara-pg", "Zara Passeig de Gràcia", "barcelona", "shop", "Zara Passeig de Gracia Barcelona"),
    ("bcn-arenas", "Arenas de Barcelona", "barcelona", "shop", "Arenas de Barcelona shopping mall"),
    ("bcn-maquinista", "La Maquinista", "barcelona", "shop", "La Maquinista Barcelona"),
    ("bcn-illa", "L'Illa Diagonal", "barcelona", "shop", "L'Illa Diagonal Barcelona"),
    ("bcn-cos", "COS Barcelona", "barcelona", "shop", "COS Barcelona Passeig de Gracia"),
    ("bcn-uniqlo", "Uniqlo Barcelona", "barcelona", "shop", "Uniqlo Barcelona"),
    ("bcn-lefties", "Lefties Barcelona", "barcelona", "shop", "Lefties Barcelona"),
    ("bcn-laroca", "La Roca Village", "barcelona", "shop", "La Roca Village outlet"),
    # Madrid
    ("mad-toma", "Toma Café", "madrid", "coffee", "Toma Cafe Malasana Madrid"),
    ("mad-hola", "Hola Coffee", "madrid", "coffee", "Hola Coffee Madrid"),
    ("mad-ruda", "Ruda Café", "madrid", "coffee", "Ruda Cafe Madrid"),
    ("mad-revuelta", "Casa Revuelta", "madrid", "food", "Casa Revuelta Madrid"),
    ("mad-sanmiguel", "Mercado San Miguel", "madrid", "food", "Mercado de San Miguel Madrid"),
    ("mad-botin", "Sobrino de Botín", "madrid", "food", "Sobrino de Botin Madrid"),
    ("mad-alberto", "Casa Alberto", "madrid", "food", "Casa Alberto Madrid"),
    ("mad-anton", "Mercado Antón Martín", "madrid", "food", "Mercado Anton Martin Madrid"),
    ("mad-ovenmoz", "Oven Mozzarella Gran Vía", "madrid", "food", "Oven Mozzarella Gran Via Madrid"),
    ("mad-lavapies-indian", "Lavapiés curry area", "madrid", "spicy", "Lavapies Madrid"),
    ("mad-thai-chueca", "Thai Chueca area", "madrid", "spicy", "Thai Garden Chueca Madrid"),
    ("mad-lavinia", "Lavinia", "madrid", "winery", "Lavinia Madrid"),
    ("mad-secretos", "Bodega de los Secretos", "madrid", "winery", "Bodega de los Secretos Madrid"),
    ("mad-fisna", "La Fisna", "madrid", "winery", "La Fisna Madrid"),
    ("mad-ribera-tour", "Ribera tours (Madrid)", "madrid", "winery", "Plaza Mayor Madrid"),
    ("mad-maranon", "Bodega Marañón", "madrid", "winery", "Bodega Maranon winery Spain"),
    ("mad-debod", "Templo de Debod", "madrid", "wander", "Templo de Debod Madrid"),
    ("mad-malasana", "Malasaña", "madrid", "wander", "Malasana Madrid"),
    ("mad-matadero", "Matadero Madrid", "madrid", "wander", "Matadero Madrid"),
    ("mad-zara", "Zara Gran Vía", "madrid", "shop", "Zara Gran Via Madrid"),
    ("mad-corte", "El Corte Inglés Preciados", "madrid", "shop", "El Corte Ingles Preciados Madrid"),
    ("mad-principe", "Príncipe Pío", "madrid", "shop", "Centro Comercial Principe Pio Madrid"),
    ("mad-plenilunio", "Plenilunio", "madrid", "shop", "Plenilunio Shopping Madrid"),
    ("mad-lasrozas", "Las Rozas Village", "madrid", "shop", "Las Rozas Village"),
    ("mad-ssreyes", "San Sebastián de los Reyes Outlets", "madrid", "shop", "The Style Outlets San Sebastian de los Reyes"),
    ("mad-cos", "COS Gran Vía", "madrid", "shop", "COS Gran Via Madrid"),
    ("mad-lefties", "Lefties Madrid", "madrid", "shop", "Lefties Gran Via Madrid"),
    # Paris
    ("par-kb", "KB CaféShop", "paris", "coffee", "KB CafeShop Pigalle Paris"),
    ("par-boot", "Boot Café", "paris", "coffee", "Boot Cafe Paris Marais"),
    ("par-frag", "Fragments", "paris", "coffee", "Fragments Paris coffee Marais"),
    ("par-breizh", "Breizh Café", "paris", "food", "Breizh Cafe Marais Paris"),
    ("par-bouillon", "Bouillon Pigalle", "paris", "food", "Bouillon Pigalle Paris"),
    ("par-fallafel", "L'As du Fallafel", "paris", "food", "L'As du Fallafel Paris"),
    ("par-frenchie", "Frenchie To Go", "paris", "food", "Frenchie To Go Paris"),
    ("par-wild", "Wild & the Moon", "paris", "food", "Wild and the Moon Paris"),
    ("par-season", "Season", "paris", "food", "Season Restaurant Paris"),
    ("par-seafood", "Seafood bistros (area)", "paris", "food", "Rue Montorgueil Paris"),
    ("par-lao", "Lao Siam", "paris", "spicy", "Lao Siam Paris 13"),
    ("par-song", "Song Heng", "paris", "spicy", "Song Heng Paris"),
    ("par-korean", "Korean Paris 15e", "paris", "spicy", "Korean restaurant Rue de la Convention Paris"),
    ("par-bateaux-pier", "Bateaux Parisiens pier", "paris", "cruise", "Bateaux Parisiens Port de la Bourdonnais"),
    ("par-yachts", "Yachts de Paris", "paris", "cruise", "Yachts de Paris Port Henri IV"),
    ("par-fracasse", "Capitaine Fracasse", "paris", "cruise", "Capitaine Fracasse Bateau Paris"),
    ("par-gare-est", "Gare de l'Est", "paris", "wine_trip", "Gare de l'Est Paris"),
    ("par-taittinger", "Taittinger Reims", "paris", "wine_trip", "Champagne Taittinger Reims"),
    ("par-veuve", "Veuve Clicquot Reims", "paris", "wine_trip", "Veuve Clicquot Reims"),
    ("par-avenue-champ", "Avenue de Champagne Épernay", "paris", "wine_trip", "Avenue de Champagne Epernay"),
    ("par-ruinart", "Ruinart Reims", "paris", "wine_trip", "Maison Ruinart Reims"),
    ("par-caves-louvre", "Les Caves du Louvre", "paris", "wine_trip", "Les Caves du Louvre Paris"),
    ("par-taillevent", "Les Caves Taillevent", "paris", "wine_trip", "Les Caves de Taillevent Paris"),
    ("par-canal", "Canal Saint-Martin", "paris", "wander", "Canal Saint-Martin Paris"),
    ("par-vivienne", "Galerie Vivienne", "paris", "wander", "Galerie Vivienne Paris"),
    ("par-buttes", "Parc des Buttes-Chaumont", "paris", "wander", "Parc des Buttes-Chaumont Paris"),
    ("par-zara-ce", "Zara Champs-Élysées", "paris", "shop", "Zara Champs Elysees Paris"),
    ("par-forum", "Forum des Halles", "paris", "shop", "Forum des Halles Paris"),
    ("par-bhv", "BHV Marais", "paris", "shop", "BHV Marais Paris"),
    ("par-lafayette", "Galeries Lafayette", "paris", "shop", "Galeries Lafayette Haussmann Paris"),
    ("par-vallee", "La Vallée Village", "paris", "shop", "La Vallee Village Serris"),
    ("par-kilo", "Kilo Shop Marais", "paris", "shop", "Kilo Shop Marais Paris"),
    ("par-cos", "COS Paris", "paris", "shop", "COS Rue de Rennes Paris"),
    ("par-guerrisol", "Guerrisol Paris", "paris", "shop", "Guerrisol Paris"),
    # Transport / trip anchors (map page quick links + route)
    ("hub-bcn-air", "Barcelona Airport BCN", "transport", "transport", "Barcelona El Prat Airport"),
    ("hub-bcn-sants", "Barcelona Sants", "transport", "transport", "Barcelona Sants railway station"),
    ("hub-mad-atocha", "Madrid Atocha", "transport", "transport", "Madrid Atocha railway station"),
    ("hub-par-cdg", "Paris CDG", "transport", "transport", "Charles de Gaulle Airport Paris"),
    ("hub-par-ory", "Paris Orly", "transport", "transport", "Orly Airport Paris"),
    # Football stadiums (logistics section)
    ("fb-psg", "Parc des Princes", "football", "football", "Parc des Princes Paris"),
    ("fb-bernabeu", "Santiago Bernabéu", "football", "football", "Santiago Bernabeu Madrid"),
    ("fb-metropolitano", "Cívitas Metropolitano", "football", "football", "Estadio Metropolitano Madrid"),
    ("fb-montjuic", "Estadi Olímpic Lluís Companys", "football", "football", "Estadi Olimpic Lluis Companys Barcelona"),
]


def nominatim_search(q: str) -> tuple[float, float] | None:
    params = urllib.parse.urlencode({"q": q, "format": "json", "limit": 1})
    url = f"https://nominatim.openstreetmap.org/search?{params}"
    req = urllib.request.Request(url, headers={"User-Agent": USER_AGENT})
    with urllib.request.urlopen(req, timeout=30) as resp:
        data = json.load(resp)
    if not data:
        return None
    return float(data[0]["lat"]), float(data[0]["lon"])


def main() -> None:
    os.makedirs("public/data", exist_ok=True)
    features = []
    failed = []
    for pid, name, city, cat, query in PLACES:
        time.sleep(1.05)
        try:
            ll = nominatim_search(query)
        except Exception as e:
            failed.append((pid, str(e)))
            continue
        if not ll:
            failed.append((pid, "no results"))
            continue
        lat, lon = ll
        maps_url = (
            "https://www.google.com/maps/search/?api=1&query="
            + urllib.parse.quote(query)
        )
        features.append(
            {
                "type": "Feature",
                "id": pid,
                "properties": {
                    "name": name,
                    "city": city,
                    "category": cat,
                    "mapsUrl": maps_url,
                },
                "geometry": {"type": "Point", "coordinates": [lon, lat]},
            }
        )
        print(f"OK {pid}", flush=True)

    out = {"type": "FeatureCollection", "features": features}
    path = "public/data/explore-places.geojson"
    with open(path, "w", encoding="utf-8") as f:
        json.dump(out, f, ensure_ascii=False, indent=0)
    print(f"Wrote {len(features)} features to {path}")
    if failed:
        print("FAILED:", failed)


if __name__ == "__main__":
    main()
