use newYork;


db.park.find().forEach(function(p) {
	var data = p.the_geom.coordinates.toString()
	var arrayOfStrings = data.split(",")
	var latit = parseFloat(arrayOfStrings[0])
	var longit = parseFloat(arrayOfStrings[1])
	db.parcPropre.insert({nom:p.park_name, longitude:longit, latitude:latit})
	});

db.school.find().forEach(function(t) {
	var cord = t.the_geom.coordinates.toString().split(",")
	var id_park = ""
	var longueur_min = 100000
	var latit = parseFloat(cord[0])
	var longit = parseFloat(cord[1])
	var centrelat = 1
	var centrelong = 0
	db.parkPropre.find().forEach(function(q) {
		var longueur = (latit-q.latit)*(latit-q.latit)+(longit-q.longit)*(longit-q.longit)
		if(longueur < longueur_min){
			id_park = q._id
			longueur_min = longueur
			centrelat = (latit-q.latit)/2
			centrelong = (longit-q.longit)/2
		}				
		})
	db.newSchool.insert({nom:t.name, longitude:longit, latitude:latit, centrelongitude:centrelong, centrelatitude:centrelat, parkId:id_park, distance:longueur_min/2})
	})

db.newSchool.find().sort({distance: 1}).forEach(function(m) {
	var resLat = 0
	var resLong = 0
	if(resLat!=0 && resLong!=0){
		db.subway.find().forEach(function(v){	
			var coord = v.the_geom.coordinates.toString().split(",")
			var latit = parseFloat(coord[0])
			var longit = parseFloat(coord[1])
			var distanceCentreMetro = (latit-v.latitude)*(latit-v.latitude)+(longit-v.longitude)*(longit-v.longitude)
			if(distanceCentreMetro > 0.2 && distanceCentreMetro < m.distance){
				resLat = m.centrelatitude
				resLong = m.centrelongitude
			}
			})
	}
	db.resultat.insert({longitude:resLong, latitude:resLat})
	})
	

	
