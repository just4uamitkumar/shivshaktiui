import { Stack, Snackbar, Alert, Grid } from "@mui/material";
import { useEffect, useState, memo } from "react";
import type { userType } from "../../../shared/Header/type";
import TypoGraphy from "../../../common/TypoGraphy";
import CustomBtn from "../../../common/Button";
import AddressModal from "./AddressModal";
import type { addressType, cityType, countryType, stateType } from "../type";
import { server } from "../../../../redux/store";
import HomeIcon from "@mui/icons-material/Home";

interface Props {
  user: Partial<userType> | null;
}

const Address: React.FC<Props> = ({ user }) => {
  const [addSnack, setAddSnack] = useState(false);
  const [addressModal, setAddressModal] = useState(false);
  const [addressLine1, setAddressLine1] = useState<string | null>(
    user?.address?.addressLine1 || null
  );
  const [addressLine2, setAddressLine2] = useState<string | null>(
    user?.address?.addressLine2 || null
  );
  const [zipCode, setZipCode] = useState<string | number | null>(
    user?.address?.zipCode !== undefined && user?.address?.zipCode !== null
      ? String(user.address.zipCode)
      : null
  );

  const [country, setCountry] = useState<countryType>({
    id: null,
    name: null,
    iso2: null,
    iso3: null,
    phonecode: null,
    capital: null,
    currency: null,
    native: null,
    emoji: null,
  });

  const [activeState, setActiveState] = useState<stateType>({
    id: null,
    name: null,
    iso2: null,
  });

  const [city, setCity] = useState<cityType>({
    id: null,
    name: null,
    latitude: null,
    longitude: null,
  });

  useEffect(() => {
    if (user?.address?.addressLine1) {
      setAddressLine1(user.address.addressLine1);
    }
    if (user?.address?.addressLine2) {
      setAddressLine2(user.address.addressLine2);
    }
    if (
      user?.address?.zipCode !== undefined &&
      user?.address?.zipCode !== null
    ) {
      setZipCode(user.address.zipCode);
    }
    if (user?.address?.country?.id) {
      setCountry({
        ...user.address.country,
        id: Number(user.address.country.id),
        name: user.address.country.name,
        iso2: user.address.country.iso2,
        iso3: user.address.country.iso3,
        phonecode: user.address.country.phonecode,
        capital: user.address.country.capital,
        currency: user.address.country.currency,
        native: user.address.country.native,
        emoji: user.address.country.emoji,
      });
    }
    if (user?.address?.state?.id) {
      setActiveState({
        ...user.address.state,
        id: Number(user.address.state.id),
        name: user.address.state.name,
        iso2: user.address.state.iso2,
      });
    }

    if (user?.address?.city?.id) {
      setCity({
        ...user.address.city,
        id: Number(user.address.city.id),
        name: user.address.city.name,
        latitude: user.address.city.latitude,
        longitude: user.address.city.longitude,
      });
    }
  }, [user]);

  const handleAddSnack = (
    _event: React.SyntheticEvent | Event,
    reason: string
  ): void => {
    if (reason === "clickaway") return;
    setAddSnack(false);
  };

  const closeModal = () => {
    setAddressModal(false);
  };

  const handleAddress = async () => {
    const updatedAddress = {} as addressType;
    updatedAddress.addressLine1 = addressLine1;
    updatedAddress.addressLine2 = addressLine2;
    updatedAddress.zipCode = Number(zipCode);
    updatedAddress.country = country;
    updatedAddress.state = activeState;
    updatedAddress.city = city;

    try {
      if (!updatedAddress.addressLine1 || !updatedAddress.zipCode) {
        return;
      }
      const response = await fetch(`${server}user/${user?._id}/address`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(updatedAddress),
      });

      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      await response.json();
      setAddressModal(false);

      window.location.reload();
    } catch (error) {
      console.error("Error updating user:", error);
    }
  };

  return (
    <>
      <Grid container spacing={2} className="mb-4">
        <Grid size={3}>
          <Stack direction="row" alignItems="center">
            <HomeIcon />
            <TypoGraphy variant="body1" className="semi-bold-font">
              {" Address"}
            </TypoGraphy>
          </Stack>
          <Stack
            direction={"row"}
            display={"flex"}
            alignItems={"flex-start"}
            alignContent={"center"}
          >
            <CustomBtn
              variant={"text"}
              text={
                !user?.address?.addressLine1 ? "Add Address" : "Update Address"
              }
              btnClass={"primary-btn"}
              onClick={() => setAddressModal(true)}
            />
          </Stack>
        </Grid>
        <Grid size={9}>
          <Stack>
            <TypoGraphy variant="body1">
              {user?.address?.addressLine1}
              {",  "}
              {user?.address?.addressLine2}
            </TypoGraphy>
          </Stack>
          <Stack>
            <TypoGraphy variant="body1">
              {user?.address?.city?.name}
              {", "}
              {user?.address?.state?.name}
              {","}
              {user?.address?.country?.name}
            </TypoGraphy>
          </Stack>
          <TypoGraphy variant="body1">{user?.address?.zipCode}</TypoGraphy>
        </Grid>
      </Grid>

      {addressModal && (
        <AddressModal
          closeModal={closeModal}
          openModal={addressModal}
          addressLine1={addressLine1}
          setAddressLine1={setAddressLine1}
          addressLine2={addressLine2}
          setAddressLine2={setAddressLine2}
          country={country}
          setCountry={setCountry}
          activeState={activeState}
          setActiveState={setActiveState}
          city={city}
          setCity={setCity}
          zipCode={zipCode}
          setZipCode={setZipCode}
          handleAddress={handleAddress}
        />
      )}

      <Snackbar
        open={addSnack}
        autoHideDuration={4000}
        onClose={handleAddSnack}
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
      >
        <Alert
          onClose={() => setAddSnack(false)}
          severity="success"
          variant="filled"
          sx={{ width: "100%" }}
        >
          {"Address updated successfully"}!
        </Alert>
      </Snackbar>
    </>
  );
};

export default memo(Address);
