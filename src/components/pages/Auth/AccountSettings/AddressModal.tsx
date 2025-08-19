import {
  FormControl,
  Grid,
  InputLabel,
  MenuItem,
  Select,
  Stack,
  TextField,
  type SelectChangeEvent,
} from "@mui/material";
import { memo, useEffect, useState } from "react";
import type { cityType, countryType, stateType } from "../type";
import { getCity, getCountry, getState } from "../locationApi";
import CustomDialog from "../../../common/Dialog";

interface Props {
  openModal: boolean;
  closeModal?: () => void;
  addressLine1?: string | null;
  setAddressLine1: (line: string | null) => void;
  addressLine2?: string | null;
  setAddressLine2: (line: string | null) => void;
  zipCode?: string | number|  null;
  setZipCode: (code: string | null) => void;
  country: countryType;
  setCountry: (country: countryType) => void;
  activeState: stateType;
  setActiveState: (state: stateType) => void;
  city: cityType;
  setCity: (city: cityType) => void;
  handleAddress: () => Promise<void>;
}

const AddressModal: React.FC<Props> = ({
  openModal,
  closeModal,
  addressLine1,
  setAddressLine1,
  addressLine2,
  setAddressLine2,
  zipCode,
  setZipCode,
  country,
  setCountry,
  activeState,
  setActiveState,
  city,
  setCity,
  handleAddress,
}) => {
  const [countryList, setCountryList] = useState<countryType[]>([]);
  const [stateList, setStateList] = useState<stateType[]>([]);
  const [cityList, setCityList] = useState<cityType[]>([]);

  //Get All the Countries
  useEffect(() => {
    getCountry().then((data) => {
      setCountryList(data);
    });
  }, []);

  //Get All the States related to selected country
  useEffect(() => {
    const countryISO2 = country?.iso2;
    if (countryISO2) {
      getState(countryISO2).then((data) => {
        setStateList(data);
      });
    }
  }, [country]);

  //Get All the cities related to selected state
  useEffect(() => {
    const isoCode = {
      stateIso2: activeState?.iso2,
      countryIso2: country?.iso2,
    };
    if (country?.iso2 && activeState?.iso2) {
      getCity(isoCode).then((data) => {
        setCityList(data);
      });
    }
  }, [activeState, country]);

  //Handle input for zip code to allow only numeric values
  const handleZipCode = (e: React.ChangeEvent<HTMLInputElement>) => {
    const input = e.target.value;
    const numericValue = input.replace(/\D/g, "");
    e.target.value = numericValue;
  };

  const handleCountryChange = (e: SelectChangeEvent<string>) => {
    const selectedCountryId = e.target.value;
    const selectedCountry = countryList.find(
      (country) => String(country.id) === selectedCountryId
    );
    if (selectedCountry) {
      setCountry(selectedCountry);
      setActiveState({ id: null, name: null, iso2: null });
      setCity({ id: null, name: null, latitude: null, longitude: null });
    }
  };

  const handleStateChange = (e: SelectChangeEvent<string>) => {
    const selectedStateId = e.target.value;
    const selectedState = stateList.find(
      (state) => String(state.id) === selectedStateId
    );
    if (selectedState) {
      setActiveState(selectedState);
      setCity({ id: null, name: null, latitude: null, longitude: null });
    }
  };

  const handleCityChange = (e: SelectChangeEvent<string>) => {
    const selectedCityId = e.target.value;
    const selectedCity = cityList.find(
      (city) => String(city.id) === selectedCityId
    );
    if (selectedCity) {
      setCity(selectedCity);
    }
  };

  return (
    <>
      <CustomDialog
        title={"Add Address"}
        dialogClass="confirm-dialog"
        open={openModal}
        onCancel={closeModal}
        onConfirm={handleAddress}
        confirmText={"Yes, Add"}
        cancelText={"No, Cancel"}
        confirmBtnClass={"primary-btn"}
        cancelBtnClass={"cancel-btn"}
        isCancelIcon={true}
        contentClass="dialog-content"
        maxWidth={"lg"}
      >
        <Grid size={12}>
          <Stack className="mb-2">
            <TextField
              label="Address Line 1"
              size="small"
              variant="outlined"
              value={addressLine1}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                setAddressLine1(e?.target?.value)
              }
              name="addressLine1"
            />
          </Stack>
          <Stack className="mb-2">
            <TextField
              label="Address Line 2"
              size="small"
              variant="outlined"
              value={addressLine2}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                setAddressLine2(e?.target?.value)
              }
              name="addressLine2"
            />
          </Stack>
          <Stack className="mb-2">
            <FormControl fullWidth>
              <InputLabel id="country-label" size="small">
                Country
              </InputLabel>
              <Select
                size="small"
                labelId="country-label"
                label="Country"
                value={country?.id ? String(country.id) : ""}
                onChange={handleCountryChange}
              >
                <MenuItem value={""}>Select Country</MenuItem>
                {countryList &&
                  countryList?.map((country: countryType) => (
                    <MenuItem key={country?.id} value={String(country.id)}>
                      {country.name}
                    </MenuItem>
                  ))}
              </Select>
            </FormControl>
          </Stack>
          <Stack className="mb-2">
            <FormControl fullWidth>
              <InputLabel id="state-label" size="small">
                State
              </InputLabel>

              <Select
                size="small"
                labelId="state-label"
                label="State"
                value={activeState?.id ? String(activeState.id) : ""}
                onChange={handleStateChange}
              >
                <MenuItem value={""}>Select State</MenuItem>
                {stateList &&
                  stateList?.map((state: stateType) => (
                    <MenuItem key={state?.id} value={String(state.id)}>
                      {state.name}
                    </MenuItem>
                  ))}
              </Select>
            </FormControl>
          </Stack>
          <Stack className="mb-2">
            <FormControl fullWidth>
              <InputLabel id="city-label" size="small">
                City
              </InputLabel>

              <Select
                size="small"
                labelId="city-label"
                label="City"
                 value={city?.id ? String(city.id) : ""}
                onChange={handleCityChange}
              >
                <MenuItem value={""}>Select City</MenuItem>
                {cityList &&
                  cityList?.map((city: cityType) => (
                    <MenuItem key={city?.id} value={String(city.id)}>
                      {city.name}
                    </MenuItem>
                  ))}
              </Select>
            </FormControl>
          </Stack>
          <Stack className="mb-2">
            <TextField
              label="Zip Code"
              size="small"
              variant="outlined"
              value={zipCode}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                setZipCode(e?.target?.value)
              }
              onInput={handleZipCode}
              name="zipCode"
            />
          </Stack>
        </Grid>
      </CustomDialog>
    </>
  );
};

export default memo(AddressModal);
