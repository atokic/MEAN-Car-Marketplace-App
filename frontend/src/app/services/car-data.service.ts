import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CarDataService {
  private carData: {
  brands: { [key: string]: string[] },
  fuelTypes: string[],
  years: number[]
} = {
  brands: {
    "Acura": [
      "2.2CL", "2.3CL", "3.0CL", "3.2CL", "ILX", "Integra", "Legend", "MDX", "NSX",
      "RDX", "3.5 RL", "RL", "RSX", "SLX", "2.5TL", "3.2TL", "TL", "TSX", "Vigor", "ZDX"
    ],
    "Alfa Romeo": [
      "164", "8C Competizione", "GTV-6", "Milano", "Spider"
    ],
    "AMC": [
      "Alliance", "Concord", "Eagle", "Encore", "Spirit"
    ],
    "Aston Martin": [
      "DB7", "DB9", "DBS", "Lagonda", "Rapide", "V12 Vantage", "V8 Vantage", "Vanquish", "Virage"
    ],
    "Audi": [
      "100", "100 Avant", "80", "80 Avant", "80 Cabrio", "90", "A1", "A2", "A3", "A3 Cabriolet",
      "A3 Limousine", "A3 Sportback", "A4", "A4 Allroad", "A4 Avant", "A4 Cabriolet", "A5", "A5 Cabriolet",
      "A5 Sportback", "A6", "A6 Allroad", "A6 Avant", "A7", "A8", "A8 Long", "Q3", "Q5", "Q7", "R8", "RS4 Cabriolet",
      "RS4/RS4 Avant", "RS5", "RS6 Avant", "RS7", "S3/S3 Sportback", "S4 Cabriolet", "S4/S4 Avant", "S5/S5 Cabriolet",
      "S6/RS6", "S7", "S8", "SQ5", "TT Coupé", "TT Roadster", "TTS"
    ],
    "Bentley": [
      "Arnage", "Azure", "Brooklands", "Continental", "Corniche", "Eight", "Mulsanne", "Turbo R"
    ],
    "BMW": [
      "128i", "135i", "135is", "318i", "318iC", "318iS", "318ti", "320i", "323ci", "323i",
      "323is", "323iT", "325Ci", "325e", "325es", "325i", "325is", "325iX", "325xi", "328Ci",
      "328i", "328iS", "328xi", "330Ci", "330i", "330xi", "335d", "335i", "335is", "335xi",
      "ActiveHybrid 3", "325", "524td", "525i", "525xi", "528e", "528i", "528iT", "528xi",
      "530i", "530iT", "530xi", "533i", "535i", "535i Gran Turismo", "535xi", "540i", "545i",
      "550i", "550i Gran Turismo", "ActiveHybrid 5", "633CSi", "635CSi", "640i", "640i Gran Coupe",
      "645Ci", "650i", "650i Gran Coupe", "L6", "733i", "735i", "735iL", "740i", "740iL",
      "740Li", "745i", "745Li", "750i", "750iL", "750Li", "760i", "760Li", "ActiveHybrid 7",
      "Alpina B7", "840Ci", "850Ci", "850CSi", "850i", "L7", "1 Series M", "M Coupe",
      "M Roadster", "M3", "M5", "M6", "X5 M", "X6 M", "ActiveHybrid X6", "X1", "X3", "X5",
      "X6", "Z3", "Z4", "Z8"
    ],
    "Buick": [
      "Century", "Electra", "Enclave", "Encore", "LaCrosse", "Le Sabre", "Lucerne", "Park Avenue",
      "Rainier", "Reatta", "Regal", "Rendezvous", "Riviera", "Roadmaster", "Skyhawk", "Skylark",
      "Somerset", "Terraza", "Verano"
    ],
    "Cadillac": [
      "Allante", "ATS", "Brougham", "Catera", "Cimarron", "CTS", "De Ville", "DTS", "Eldorado",
      "Escalade", "Escalade ESV", "Escalade EXT", "Fleetwood", "Seville", "SRX", "STS", "XLR", "XTS"
    ],
    "Chevrolet": [
      "Astro", "Avalanche", "Aveo", "Aveo5", "Beretta", "Blazer", "Camaro", "Caprice",
      "Captiva Sport", "Cavalier", "Celebrity", "Chevette", "Citation", "Cobalt", "Colorado",
      "Corsica", "Corvette", "Cruze", "El Camino", "Equinox", "Express Van", "G Van", "HHR",
      "Impala", "Kodiak C4500", "Lumina", "Lumina APV", "LUV", "Malibu", "Metro", "Monte Carlo",
      "Nova", "Prizm", "S10 Blazer", "S10 Pickup", "Silverado and other C/K1500",
      "Silverado and other C/K2500", "Silverado and other C/K3500", "Sonic", "Spark", "Spectrum",
      "Sprint", "SSR", "Suburban", "Tahoe", "Tracker", "TrailBlazer", "TrailBlazer EXT",
      "Traverse", "Uplander", "Venture", "Volt"
    ],
    "Chrysler": [
      "200", "300", "300M", "Aspen", "Caravan", "Cirrus", "Concorde", "Conquest", "Cordoba",
      "Crossfire", "E Class", "Fifth Avenue", "Grand Voyager", "Imperial", "Intrepid", "Laser",
      "LeBaron", "LHS", "Neon", "New Yorker", "Newport", "Pacifica", "Prowler", "PT Cruiser",
      "Sebring", "TC by Maserati", "Town & Country", "Voyager"
    ],
    "Daewoo": [
      "Lanos", "Leganza", "Nubira"
    ],
    "Daihatsu": [
      "Charade", "Rocky"
    ],
    "Datsun": [
      "200SX", "210", "280ZX", "300ZX", "310", "510", "720", "810", "Maxima", "Pickup",
      "Pulsar", "Sentra", "Stanza"
    ],
    "DeLorean": [
      "DMC-12"
    ],
    "Dodge": [
      "400", "600", "Aries", "Avenger", "Caliber", "Caravan", "Challenger", "Charger", "Colt",
      "Conquest", "D/W Truck", "Dakota", "Dart", "Daytona", "Diplomat", "Durango", "Dynasty",
      "Grand Caravan", "Intrepid", "Journey", "Lancer", "Magnum", "Mirada", "Monaco", "Neon",
      "Nitro", "Omni", "Raider", "Ram 1500 Truck", "Ram 2500 Truck", "Ram 3500 Truck",
      "Ram 4500 Truck", "Ram 50 Truck", "RAM C/V", "Ram SRT-10", "Ram Van", "Ram Wagon",
      "Ramcharger", "Rampage", "Shadow", "Spirit", "Sprinter", "SRT-4", "St. Regis", "Stealth",
      "Stratus", "Viper"
    ],
    "Eagle": [
      "Medallion", "Premier", "Summit", "Talon", "Vision"
    ],
    "Ferrari": [
      "308 GTB Quattrovalvole", "308 GTBI", "308 GTS Quattrovalvole", "308 GTSI", "328 GTB",
      "328 GTS", "348 GTB", "348 GTS", "348 Spider", "348 TB", "348 TS", "360", "456 GT",
      "456M GT", "458 Italia", "512 BBi", "512M", "512TR", "550 Maranello", "575M Maranello",
      "599 GTB Fiorano", "599 GTO", "612 Scaglietti", "California", "Enzo", "F355", "F40",
      "F430", "F50", "FF", "Mondial", "Testarossa"
    ],
    "Fiat": [
      "2000 Spider", "500", "Bertone X1/9", "Brava", "Pininfarina Spider", "Strada", "X1/9"
    ],
    "Fisker": [
      "Karma"
    ],
    "Ford": [
      "Aerostar", "Aspire", "Bronco", "Bronco II", "C-Max", "Contour", "Crown Victoria", "E-150",
      "E-250", "E-350", "Escape", "Escort", "Expedition", "Explorer", "F-150", "F-250", "F-350",
      "F-450", "F-550", "F-600", "F-700", "F-800", "F-900", "F-960", "F-999", "Five Hundred",
      "Flex", "Focus", "Ford GT", "Freestar", "Fusion", "Galaxy", "LTD", "LTD Crown Victoria",
      "Mustang", "Pinto", "Ranger", "Shelby GT500", "Shelby GT350", "Taurus", "Thunderbird",
      "Transit Connect", "Transit Wagon", "Wagon"
    ],
    "Genesis": [
      "G70", "G80", "G90", "GV60", "GV70", "GV80"
    ],
    "Geo": [
      "Metro", "Prizm", "Tracker"
    ],
    "GMC": [
      "Acadia", "Canyon", "Envoy", "G1000", "G1500", "G2500", "G3500", "Jimmy", "Savana 1500",
      "Savana 2500", "Savana 3500", "Sierra 1500", "Sierra 2500", "Sierra 3500", "Terrain", "Yukon"
    ],
    "Honda": [
      "Accord", "Civic", "Clarity", "CR-V", "CR-Z", "Fit", "HR-V", "Insight", "Odyssey", "Passport",
      "Pilot", "Prelude", "Ridgeline"
    ],
    "Hummer": [
      "H1", "H2", "H3"
    ],
    "Hyundai": [
      "Accent", "Azera", "Elantra", "Entourage", "Genesis", "G80", "G90", "Kona", "Nexo",
      "Palisade", "Santa Cruz", "Santa Fe", "Sonata", "Tucson", "Veloster", "Venue"
    ],
    "Infiniti": [
      "G20", "G25", "G35", "G37", "I30", "I35", "J30", "M30", "M35", "M45", "M56", "Q30", "Q50",
      "Q60", "Q70", "QX4", "QX50", "QX55", "QX56", "QX60", "QX80"
    ],
    "Jaguar": [
      "E-PACE", "F-PACE", "F-TYPE", "I-PACE", "XE", "XF", "XJ", "XK"
    ],
    "Jeep": [
      "Cherokee", "Commander", "Compass", "Grand Cherokee", "Liberty", "Patriot", "Renegade",
      "Wagoneer", "Wrangler"
    ],
    "Kia": [
      "Cadenza", "Forte", "K5", "Niro", "Optima", "Rio", "Seltos", "Sorento", "Soul", "Sportage",
      "Stinger", "Telluride"
    ],
    "Lamborghini": [
      "Aventador", "Centenario", "Huracán", "Murciélago", "Gallardo", "Urus"
    ],
    "Land Rover": [
      "Defender", "Discovery", "Discovery Sport", "Range Rover", "Range Rover Evoque",
      "Range Rover Velar"
    ],
    "Lexus": [
      "ES", "GS", "GX", "IS", "LC", "LS", "NX", "RX", "UX"
    ],
    "Lincoln": [
      "Aviator", "Blackwood", "Continental", "Corsair", "MKC", "MKT", "MKS", "MKZ", "Navigator",
      "Town Car"
    ],
    "Lotus": [
      "Evora", "Exige", "Elise"
    ],
    "Maserati": [
      "Ghibli", "GranCabrio", "GranTurismo", "Levante", "Quattroporte"
    ],
    "Mazda": [
      "2", "3", "5", "6", "CX-3", "CX-5", "CX-7", "CX-9", "MX-5 Miata", "RX-7", "RX-8"
    ],
    "McLaren": [
      "570S", "600LT", "720S", "Artura", "P1", "Senna"
    ],
    "Mercedes": [
      "A-Class", "B-Class", "C-Class", "CLA-Class", "CLS-Class", "E-Class", "G-Class", "GLA-Class",
      "GLC-Class", "GLE-Class", "GLS-Class", "S-Class", "SL-Class", "SLC-Class", "AMG GT", "EQB",
      "EQS"
    ],
    "Mini": [
      "Cooper", "Countryman", "Clubman", "Paceman"
    ],
    "Mitsubishi": [
      "3000GT", "Eclipse", "Endeavor", "Galant", "Lancer", "Lancer Evolution", "Mirage", "Montero",
      "Outlander", "Outlander Sport", "Raider", "RVR"
    ],
    "Morgan": [
      "Plus 4", "Plus 6", "Plus 8", "Roadster", "Aero 8"
    ],
    "Nissan": [
      "350Z", "370Z", "Altima", "Armada", "Frontier", "Juke", "Kicks", "Leaf", "Maxima", "Murano",
      "NV200", "NV3500", "Pathfinder", "Rogue", "Rogue Sport", "Sentra", "Titan", "Versa", "Xterra"
    ],
    "Pagani": [
      "Huayra", "Zonda"
    ],
    "Peugeot": [
      "1007", "107", "106", "108", "2008", "205", "205 Cabrio", "206", "206 CC", "206 SW", "207", "207 CC", "207 SW",
      "306", "307", "307 CC", "307 SW", "308", "308 CC", "308 SW", "309", "4007", "4008", "405", "406", "407", "407 SW",
      "5008", "508", "508 SW", "605", "806", "607", "807", "Bipper", "RCZ"
    ],
    "Plymouth": [
      "Barracuda", "Belvedere", "Breeze", "Cuda", "Duster", "Fury", "GTX", "Horizon", "Prowler",
      "Road Runner", "Satellite", "Trailduster", "Valiant", "Voyager"
    ],
    "Pontiac": [
      "Aztek", "Bonneville", "G3", "G5", "G6", "G8", "Grand Am", "Grand Prix", "Montana", "Solstice",
      "Sunbird", "Sunfire", "Vibe"
    ],
    "Porsche": [
      "718 Boxster", "718 Cayman", "911", "918 Spyder", "Cayenne", "Macan", "Panamera"
    ],
    "RAM": [
      "1500", "2500", "3500", "4500", "5500"
    ],
    "Rover": [
      "75", "MG F"
    ],
    "Saab": [
      "9-2X", "9-3", "9-4X", "9-5", "9-7X"
    ],
    "Saturn": [
      "Aura", "Ion", "Outlook", "Sky", "Vue"
    ],
    "Scion": [
      "FR-S", "iA", "iM", "tC", "xB", "xD"
    ],
    "Shelby": [
      "Cobra", "GT350", "GT500", "Series 1"
    ],
    "Smart": [
      "Fortwo", "Forfour"
    ],
    "Subaru": [
      "Ascent", "BRZ", "Crosstrek", "Forester", "Impreza", "Legacy", "Outback", "WRX", "XV"
    ],
    "Tesla": [
      "Model 3", "Model S", "Model X", "Model Y", "Roadster"
    ],
    "Toyota": [
      "4Runner", "86", "Avalon", "Camry", "Carolla", "Highlander", "Land Cruiser", "Matrix",
      "Mirai", "Prius", "RAV4", "Sequoia", "Sienna", "Supra", "Tacoma", "Tundra", "Venza"
    ],
    "Volkswagen": [
      "Beetle", "CC", "Eos", "Golf", "Jetta", "Passat", "Phaeton", "R32", "Rabbit", "Tiguan",
      "Touareg", "Transporter", "GTI"
    ],
    "Volvo": [
      "240", "260", "740", "760", "780", "850", "C30", "C70", "S40", "S60", "S70", "S80",
      "S90", "V40", "V50", "V60", "V70", "V90", "XC60", "XC70", "XC90"
    ]
  },
  fuelTypes: ["Petrol", "Diesel", "Electric", "Ethanol (FFV, E85, etc.)", "Hybrid (diesel/electric)", "Hybrid (petrol/electric)", "Hydrogen", "LPG", "Natural Gas", "Other", "Plug-in hybrid"],
  years: Array.from({ length: 125 }, (_, i) => new Date().getFullYear() - i)
};

  getBrands(): string[] {
    return Object.keys(this.carData.brands);
  }

  getModels(brand: string): string[] {
    return this.carData.brands[brand] || [];
  }

  getFuelTypes(): string[] {
    return this.carData.fuelTypes;
  }

  getYears(): number[] {
    return this.carData.years;
  }
}
