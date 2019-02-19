import { LowStatusIcon, MediumStatusIcon, HighStatusIcon } from './Components/AlertBox';

export const formatDate = (date) => {
	var d = new Date(date),
	month = '' + (d.getMonth() + 1),
	day = '' + d.getDate(),
	year = d.getFullYear();
	
	if (month.length < 2) month = '0' + month;
	if (day.length < 2) day = '0' + day;
	
	return [month, day, year].join('/');
}

export const getStatusIcon = function (severity) {
	switch (severity.toLowerCase()) {
		case 'high':
			return HighStatusIcon();
		case 'low':
			return LowStatusIcon();
		case 'medium':
			return MediumStatusIcon();
		default:
			return null;
	}
};