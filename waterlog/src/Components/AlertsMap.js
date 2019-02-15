import React from 'react';
import Loader from './Loader';
import MapComponent from './Map';

const AlertsMap = ({ error, loading, sensorLocations }) => {
	if (error) {
		return <div>Error! {error.message}</div>;
	}
	if (loading) {
		return (
			<div className="alerts-map">
				<Loader />
			</div>
		);
	}

	return <MapComponent />;
};
export default AlertsMap;
