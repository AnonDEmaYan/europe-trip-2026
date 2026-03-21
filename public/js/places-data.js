/**
 * Explore spots + image pools (Unsplash — free license; credit in UI).
 * Images are thematic for category/neighborhood, not always the exact venue.
 */
(function (w) {
  "use strict";

  var u = "https://images.unsplash.com";
  var q = "?auto=format&fit=crop&w=960&q=82";

  /** Verified HTTP 200 from images.unsplash.com; thematic only (not exact venues). */
  function img(id) {
    return {
      url: u + "/photo-" + id + q,
      credit: "Unsplash",
      creditUrl: "https://unsplash.com/?utm_source=europe-trip-2026&utm_medium=referral",
    };
  }

  w.TRIP_IMAGE_POOLS = {
    barcelona: {
      coffee: [
        img("1495474472287-4d71bcdd2085"),
        img("1442512595331-e89e73853f31"),
        img("1509042239860-f550ce710b93"),
      ],
      food: [
        img("1555396273-367ea4eb4db5"),
        img("1567620905732-2d1ec7ab7445"),
        img("1556910103-1c02745aae4d"),
      ],
      winery: [
        img("1510812431401-41d2bd2722f3"),
        img("1474722883778-792e7990302f"),
        img("1600891964599-f61ba0e24092"),
      ],
      wander: [
        img("1539037116277-4db20889f2d4"),
        img("1523906834658-6e24ef2386f9"),
        img("1489515217757-5fd1be406fef"),
      ],
      shop: [
        img("1578662996442-48f60103fc96"),
        img("1559339352-11d035aa65de"),
      ],
    },
    madrid: {
      coffee: [img("1509042239860-f550ce710b93"), img("1495474472287-4d71bcdd2085")],
      food: [
        img("1517248135467-4c7edcad34c4"),
        img("1556910103-1c02745aae4d"),
        img("1567620905732-2d1ec7ab7445"),
      ],
      winery: [img("1510812431401-41d2bd2722f3"), img("1474722883778-792e7990302f"), img("1600891964599-f61ba0e24092")],
      wander: [
        img("1539037116277-4db20889f2d4"),
        img("1523906834658-6e24ef2386f9"),
        img("1466978913421-dad2ebd01d17"),
      ],
      shop: [img("1578662996442-48f60103fc96"), img("1559339352-11d035aa65de")],
    },
    paris: {
      coffee: [
        img("1495474472287-4d71bcdd2085"),
        img("1442512595331-e89e73853f31"),
        img("1509042239860-f550ce710b93"),
      ],
      food: [
        img("1555396273-367ea4eb4db5"),
        img("1567620905732-2d1ec7ab7445"),
        img("1556910103-1c02745aae4d"),
      ],
      winery: [
        img("1510812431401-41d2bd2722f3"),
        img("1474722883778-792e7990302f"),
        img("1600891964599-f61ba0e24092"),
      ],
      wander: [
        img("1502602898657-3e91760cbb34"),
        img("1539037116277-4db20889f2d4"),
        img("1489515217757-5fd1be406fef"),
      ],
      shop: [img("1578662996442-48f60103fc96"), img("1559339352-11d035aa65de")],
    },
  };

  w.TRIP_SPOTS = [
    { city: "barcelona", cat: "coffee", name: "Satan’s Coffee Corner", note: "Gothic · specialty", maps: "https://www.google.com/maps/search/?api=1&query=Satan%27s+Coffee+Corner+Barcelona" },
    { city: "barcelona", cat: "coffee", name: "Nomad Coffee (Passatge Sert)", note: "Roaster & bar", maps: "https://www.google.com/maps/search/?api=1&query=Nomad+Coffee+Lab+Barcelona" },
    { city: "barcelona", cat: "coffee", name: "Three Marks Coffee", note: "Third wave", maps: "https://www.google.com/maps/search/?api=1&query=Three+Marks+Coffee+Barcelona" },
    { city: "barcelona", cat: "food", name: "Bar del Pla", note: "Tapas · Born", maps: "https://www.google.com/maps/search/?api=1&query=Bar+del+Pla+Barcelona" },
    { city: "barcelona", cat: "food", name: "Quimet & Quimet", note: "Standing tapas · Poble-sec", maps: "https://www.google.com/maps/search/?api=1&query=Quimet+Quimet+Barcelona" },
    { city: "barcelona", cat: "food", name: "Vinitus", note: "Lively tapas", maps: "https://www.google.com/maps/search/?api=1&query=Vinitus+Barcelona" },
    { city: "barcelona", cat: "food", name: "Disfrutar", note: "World-class tasting — book ahead", maps: "https://www.google.com/maps/search/?api=1&query=Disfrutar+Barcelona" },
    { city: "barcelona", cat: "winery", name: "Codorníu", note: "Historic cava · Sant Sadurní — book tour", maps: "https://www.google.com/maps/search/?api=1&query=Codorn%C3%ADu+Sant+Sadurn%C3%AD+d%27Anoia" },
    { city: "barcelona", cat: "winery", name: "Freixenet", note: "Cava · visitor experience — reserve", maps: "https://www.google.com/maps/search/?api=1&query=Freixenet+Sant+Sadurn%C3%AD" },
    { city: "barcelona", cat: "winery", name: "Familia Torres (Pacs)", note: "Penedès wines · book ahead", maps: "https://www.google.com/maps/search/?api=1&query=Bodegas+Torres+Pacs+del+Pened%C3%A8s" },
    { city: "barcelona", cat: "winery", name: "Jean Leon", note: "Estate tastings · book", maps: "https://www.google.com/maps/search/?api=1&query=Jean+Leon+winery+Pened%C3%A8s" },
    { city: "barcelona", cat: "winery", name: "Sant Sadurní d’Anoia station", note: "~1 h train from Barcelona — walk between caves", maps: "https://www.google.com/maps/search/?api=1&query=Sant+Sadurn%C3%AD+d%27Anoia+train+station" },
    { city: "barcelona", cat: "wander", name: "Bunkers del Carmel", note: "City views · sunset", maps: "https://www.google.com/maps/search/?api=1&query=Bunkers+del+Carmel+Barcelona" },
    { city: "barcelona", cat: "wander", name: "El Born", note: "Lanes · boutiques · bars", maps: "https://www.google.com/maps/search/?api=1&query=El+Born+Barcelona" },
    { city: "barcelona", cat: "wander", name: "Gràcia", note: "Plazas · local vibe", maps: "https://www.google.com/maps/search/?api=1&query=Gr%C3%A0cia+Barcelona" },
    { city: "barcelona", cat: "shop", name: "Zara Passeig de Gràcia", note: "Flagship strip", maps: "https://www.google.com/maps/search/?api=1&query=Zara+Passeig+de+Gr%C3%A0cia+Barcelona" },
    { city: "barcelona", cat: "shop", name: "Arenas de Barcelona", note: "Mall in old bullring · rooftop", maps: "https://www.google.com/maps/search/?api=1&query=Arenas+de+Barcelona+shopping" },
    { city: "barcelona", cat: "shop", name: "La Maquinista", note: "Large mall · north", maps: "https://www.google.com/maps/search/?api=1&query=La+Maquinista+Barcelona" },
    { city: "barcelona", cat: "shop", name: "L’Illa Diagonal", note: "Mid-city mall", maps: "https://www.google.com/maps/search/?api=1&query=L%27Illa+Diagonal+Barcelona" },

    { city: "madrid", cat: "coffee", name: "Toma Café", note: "Malasaña", maps: "https://www.google.com/maps/search/?api=1&query=Toma+Caf%C3%A9+Madrid" },
    { city: "madrid", cat: "coffee", name: "Hola Coffee", note: "Several locations", maps: "https://www.google.com/maps/search/?api=1&query=Hola+Coffee+Madrid" },
    { city: "madrid", cat: "coffee", name: "Ruda Café", note: "Near La Latina", maps: "https://www.google.com/maps/search/?api=1&query=Ruda+Caf%C3%A9+Madrid" },
    { city: "madrid", cat: "food", name: "Casa Revuelta", note: "Fried cod · tapas", maps: "https://www.google.com/maps/search/?api=1&query=Casa+Revuelta+Madrid" },
    { city: "madrid", cat: "food", name: "Mercado de San Miguel", note: "Gourmet hall", maps: "https://www.google.com/maps/search/?api=1&query=Mercado+San+Miguel+Madrid" },
    { city: "madrid", cat: "food", name: "Sobrino de Botín", note: "Historic · book", maps: "https://www.google.com/maps/search/?api=1&query=Sobrino+de+Bot%C3%ADn+Madrid" },
    { city: "madrid", cat: "food", name: "Casa Alberto", note: "Classic tavern", maps: "https://www.google.com/maps/search/?api=1&query=Casa+Alberto+Madrid" },
    { city: "madrid", cat: "winery", name: "Lavinia", note: "Flagship shop · bar by the glass", maps: "https://www.google.com/maps/search/?api=1&query=Lavinia+Madrid" },
    { city: "madrid", cat: "winery", name: "Bodega de los Secretos", note: "Wine bar in vaulted cellars", maps: "https://www.google.com/maps/search/?api=1&query=Bodega+de+los+Secretos+Madrid" },
    { city: "madrid", cat: "winery", name: "La Fisna", note: "Natural wine bar · Malasaña area", maps: "https://www.google.com/maps/search/?api=1&query=La+Fisna+Madrid+wine" },
    { city: "madrid", cat: "winery", name: "Ribera del Duero day tours", note: "Pre-book coach tours from Madrid", maps: "https://www.google.com/maps/search/?api=1&query=Ribera+del+Duero+wine+tour+Madrid" },
    { city: "madrid", cat: "winery", name: "Bodega Marañón", note: "Garnacha — visit by appointment", maps: "https://www.google.com/maps/search/?api=1&query=Bodega+Mara%C3%B1%C3%B3n+winery+Spain" },
    { city: "madrid", cat: "wander", name: "Templo de Debod", note: "Sunset", maps: "https://www.google.com/maps/search/?api=1&query=Templo+de+Debod+Madrid" },
    { city: "madrid", cat: "wander", name: "Malasaña & Chueca", note: "Shops · nightlife", maps: "https://www.google.com/maps/search/?api=1&query=Malasa%C3%B1a+Madrid" },
    { city: "madrid", cat: "wander", name: "Matadero Madrid", note: "Culture · river", maps: "https://www.google.com/maps/search/?api=1&query=Matadero+Madrid" },
    { city: "madrid", cat: "shop", name: "Zara Gran Vía", note: "Huge flagship zone", maps: "https://www.google.com/maps/search/?api=1&query=Zara+Gran+V%C3%ADa+Madrid" },
    { city: "madrid", cat: "shop", name: "El Corte Inglés Preciados", note: "Department store", maps: "https://www.google.com/maps/search/?api=1&query=El+Corte+Ingl%C3%A9s+Preciados+Madrid" },
    { city: "madrid", cat: "shop", name: "Príncipe Pío", note: "Mall + station", maps: "https://www.google.com/maps/search/?api=1&query=Centro+Comercial+Pr%C3%ADncipe+P%C3%ADo+Madrid" },
    { city: "madrid", cat: "shop", name: "Plenilunio", note: "Big mall NE", maps: "https://www.google.com/maps/search/?api=1&query=Plenilunio+Shopping+Madrid" },

    { city: "paris", cat: "coffee", name: "KB CaféShop", note: "Pigalle", maps: "https://www.google.com/maps/search/?api=1&query=KB+Caf%C3%A9Shop+Paris" },
    { city: "paris", cat: "coffee", name: "Boot Café", note: "Marais", maps: "https://www.google.com/maps/search/?api=1&query=Boot+Caf%C3%A9+Paris" },
    { city: "paris", cat: "coffee", name: "Fragments", note: "Marais", maps: "https://www.google.com/maps/search/?api=1&query=Fragments+Paris+coffee" },
    { city: "paris", cat: "food", name: "Breizh Café", note: "Galettes & crêpes", maps: "https://www.google.com/maps/search/?api=1&query=Breizh+Caf%C3%A9+Marais+Paris" },
    { city: "paris", cat: "food", name: "Bouillon Pigalle", note: "Buzzy classics", maps: "https://www.google.com/maps/search/?api=1&query=Bouillon+Pigalle+Paris" },
    { city: "paris", cat: "food", name: "L’As du Fallafel", note: "Marais", maps: "https://www.google.com/maps/search/?api=1&query=L%27As+du+Fallafel+Paris" },
    { city: "paris", cat: "food", name: "Frenchie To Go", note: "Casual", maps: "https://www.google.com/maps/search/?api=1&query=Frenchie+To+Go+Paris" },
    { city: "paris", cat: "winery", name: "Paris Gare de l’Est", note: "Trains to Reims — book early", maps: "https://www.google.com/maps/search/?api=1&query=Gare+de+l%27Est+Paris" },
    { city: "paris", cat: "winery", name: "Champagne Taittinger (Reims)", note: "Cellar tours — book official site", maps: "https://www.google.com/maps/search/?api=1&query=Taittinger+Reims+Champagne" },
    { city: "paris", cat: "winery", name: "Veuve Clicquot (Reims)", note: "Prestige visits — reserve", maps: "https://www.google.com/maps/search/?api=1&query=Veuve+Clicquot+Reims" },
    { city: "paris", cat: "winery", name: "Avenue de Champagne, Épernay", note: "Moët & houses", maps: "https://www.google.com/maps/search/?api=1&query=Avenue+de+Champagne+%C3%89pernay" },
    { city: "paris", cat: "winery", name: "Ruinart (Reims)", note: "Chalk cellars — book ahead", maps: "https://www.google.com/maps/search/?api=1&query=Maison+Ruinart+Reims" },
    { city: "paris", cat: "winery", name: "Les Caves du Louvre", note: "Wine experience in Paris", maps: "https://www.google.com/maps/search/?api=1&query=Les+Caves+du+Louvre+Paris" },
    { city: "paris", cat: "winery", name: "Les Caves de Taillevent", note: "Retail + by-the-glass", maps: "https://www.google.com/maps/search/?api=1&query=Caves+Taillevent+Paris" },
    { city: "paris", cat: "wander", name: "Canal Saint-Martin", note: "Stroll & bridges", maps: "https://www.google.com/maps/search/?api=1&query=Canal+Saint-Martin+Paris" },
    { city: "paris", cat: "wander", name: "Galerie Vivienne", note: "Covered passage", maps: "https://www.google.com/maps/search/?api=1&query=Galerie+Vivienne+Paris" },
    { city: "paris", cat: "wander", name: "Parc des Buttes-Chaumont", note: "Green escape", maps: "https://www.google.com/maps/search/?api=1&query=Buttes-Chaumont+Paris" },
    { city: "paris", cat: "shop", name: "Zara Champs-Élysées", note: "Flagship", maps: "https://www.google.com/maps/search/?api=1&query=Zara+Champs-%C3%89lys%C3%A9es+Paris" },
    { city: "paris", cat: "shop", name: "Forum des Halles", note: "Central mall", maps: "https://www.google.com/maps/search/?api=1&query=Forum+des+Halles+Paris" },
    { city: "paris", cat: "shop", name: "BHV Marais", note: "+ rooftop", maps: "https://www.google.com/maps/search/?api=1&query=BHV+Marais+Paris" },
    { city: "paris", cat: "shop", name: "Galeries Lafayette", note: "Haussmann", maps: "https://www.google.com/maps/search/?api=1&query=Galeries+Lafayette+Haussmann+Paris" },
  ];
})(typeof window !== "undefined" ? window : globalThis);
