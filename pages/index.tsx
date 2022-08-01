import type { NextPage } from "next";
import Head from "next/head";
import Map from "react-map-gl";
import { useEffect, useState } from "react";
import Data from "../types/data";
import Local from "../types/Locals";
import axios from "axios";
const data: Data[] = [
  {
    id: 1,
    address: "77/2/5 Hoàng Diệu 2 phường Linh Trung thành phố thủ đức",
  },
  {
    id: 2,
    address:
      "15/21 Võ Duy Ninh phường 22 quận Bình Thạnh thành phố Hồ Chí Minh",
  },
];
const Home: NextPage = () => {
  const [location, setLocation] = useState({
    longitude: 106.71806,
    latitude: 10.79361,
    zoom: 16,
  });
  let newAddressData: Local[] = [];
  data.map((address) => {
    axios
      .get(
        `https://api.mapbox.com/geocoding/v5/mapbox.places/${address.address}.json?access_token=pk.eyJ1IjoiY2Z0bmloIiwiYSI6ImNsNjdzZnB5bzNudTQzYm1wa21mbXo2emEifQ.SDqggkiy2bskCxRu4dYYkA`
      )
      .then((result) => {
        newAddressData.push({
          ...address,
          longitude: result.data.features[0].center[0],
          latitude: result.data.features[0].center[1],
        });

        console.log(newAddressData);
      })
      .catch((err) => console.log(err));
  });
  return (
    <div>
      <Head>
        <title> My Map</title>
      </Head>
      <Map
        initialViewState={location}
        style={{ width: "98vw", height: "100vh" }}
        mapStyle="mapbox://styles/mapbox/streets-v9"
        mapboxAccessToken="pk.eyJ1IjoiY2Z0bmloIiwiYSI6ImNsNjdzZnB5bzNudTQzYm1wa21mbXo2emEifQ.SDqggkiy2bskCxRu4dYYkA"
      />
    </div>
  );
};

export default Home;
