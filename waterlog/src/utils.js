const alertImages = {
	low: 'images/low_severity.png',
	medium: 'images/medium_severity.png',
	high: 'images/high_severity.png'
}

export const formatDate = (date) => {
	var d = new Date(date),
	month = '' + (d.getMonth() + 1),
	day = '' + d.getDate(),
	year = d.getFullYear();
	
	if (month.length < 2) month = '0' + month;
	if (day.length < 2) day = '0' + day;
	
	return [month, day, year].join('/');
}

export const getStatusIcon = (severity) => {
	switch (severity.toLowerCase()) {
		case 'high':
			return alertImages.high;
		case 'low':
			return alertImages.low;
		case 'medium':
			return alertImages.medium;
		default:
			return null;
	}
};

export const getSensorLayout = (id) => {
	const sensors = [];
	if(id===1){
		sensors.push(id);
		sensors.push(id+1);
		sensors.push(id+2);
	}
	else if (id === 6) {
		sensors.push(id-2);
		sensors.push(id-1);
		sensors.push(id);
	}
	else {
		sensors.push(id-1);
		sensors.push(id);
		sensors.push(id+1);
	}
	return sensors;
}
