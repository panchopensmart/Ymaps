import { createRef } from "preact";
import {useState} from 'preact/hooks';
import { YMaps, Map, Placemark } from "react-yandex-maps";

const mapState = {
  center: [55.76, 37.64],
  zoom: 17,
  controls: []
};

const MapC = () => {
  const inputRef = createRef();

  const [addressCoord, setAddressCoord] = useState();
  const [inputValue, setInputValue] = useState("");
  const [savedYmaps, setSavedYmaps] = useState();
  const [isHideYandexInput, setIsHideYandexInput] = useState(false);

  const onClickAddress = (e, ymaps) => {
    const name = e.get("item").value;
    setInputValue(name);
    ymaps.geocode(name).then((result) => {
      const coord = result.geoObjects.get(0).geometry.getCoordinates();
      setAddressCoord(coord);
    });
  };

  const onYmapsLoad = (ymaps) => {
    setSavedYmaps(ymaps);
    const suggestView = new ymaps.SuggestView(inputRef.current);
    suggestView.events.add("select", (e) => {
      return onClickAddress(e, ymaps);
    });
  };

  const onClickToMap = async (e) => {
    const coords = e.get("coords");
    setAddressCoord(coords);
    const result = await savedYmaps.geocode(coords);
    const firstGeoObject = result.geoObjects.get(0);
    setInputValue(firstGeoObject.getAddressLine());
    setIsHideYandexInput(true);
  };

  return (
    <div>
      <div
        className={
          isHideYandexInput
            ? "input__wrapper_hide-dropdown"
            : "input__wrapper_show-dropdown"
        }
      >
        <input
          ref={inputRef}
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          placeholder="Инпут"
          onFocus={() => setIsHideYandexInput(false)}
        />
      </div>
      <YMaps
        query={{
          load: "package.full",
          apikey: "ключ ввести"
        }}
      >
        <Map
          state={
            addressCoord ? { ...mapState, center: addressCoord } : mapState
          }
          onLoad={onYmapsLoad}
          width="100%"
          onClick={onClickToMap}
        >
          {addressCoord && <Placemark geometry={addressCoord} />}
        </Map>
      </YMaps>
    </div>
  );
};

export default MapC

