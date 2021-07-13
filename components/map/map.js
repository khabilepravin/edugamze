import React, { useEffect } from "react";
import Chart from "react-google-charts";

const Map = React.memo((props) => {
  return (
    <Chart
      chartType="GeoChart"
      data={[
        ["Country"],
        [props.currentCountry]
      ]}
      mapsApiKey={process.env.REACT_APP_mapApiKey}
      rootProps={{ "data-testid": "1" }}
      options={{ "domain":"IN", defaultColor:'#0000FF',"enableRegionInteractivity":false }}
    />
  );
});

export default Map;
