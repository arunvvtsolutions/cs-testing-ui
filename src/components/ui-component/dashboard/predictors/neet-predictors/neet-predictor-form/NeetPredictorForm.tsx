/* eslint-disable react-hooks/exhaustive-deps */
'use client';
import { Box, Button, FormControlLabel, InputLabel, Radio, RadioGroup, TextField, Typography } from '@mui/material';
import React, { useEffect, useState } from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { useRouter } from 'next/navigation';

import styles from './form.module.css';
import CustomDropdown, { IDropDownProps } from './CustomDropdown';
import { ErrorMessage, FormKeys, FormPlaceholderContent, NeetPredictorFormContent } from './constant';

import { INeetPredictorFormProps } from '.';

import { useDispatch, useSelector } from 'store';
import {
  addFormData,
  getGeographicAreaBasedData,
  getStateCategoryData,
  getStateCategoryDependentData,
  getStateSeatBasedData,
  updateFormData
  // updateFormData
} from 'utils/api/neet-predictor';
import { replaceSpecialChar } from 'utils';
import { openSnackbar } from 'store/slices/snackbar';
import { ErrorSnackbar, SuccessSnackbar } from 'ui-component/common/snackbar-type';
import { getNeetPredictorFormData, hasError } from 'store/slices/predictor';
export interface IStateListProps {
  stateId: number;
  stateName: string;
  stateUrl: string;
}
export interface IIndiaCategoryListProps {
  id: number;
  indiaCategory: string;
}
export interface IStateCategoryListProps {
  id: number;
  stateCategory: string;
}
export interface IStateCategoryDependentProps {
  id?: number;
  name: string;
}
export interface IStateCategoryDependentListProps {
  gender: IStateCategoryDependentProps[] | [];
  collegeRegion: IStateCategoryDependentProps[] | [];
  belongs: IStateCategoryDependentProps[] | [];
  subCasteData: IStateCategoryDependentProps[] | [];
  seatType: IStateCategoryDependentProps[] | [];
  minority: IStateCategoryDependentProps[] | [];
  provisitional: IStateCategoryDependentProps[] | [];
  specialQuota: IStateCategoryDependentProps[] | [];
  speciallyAbled: IStateCategoryDependentProps[] | [];
}
export interface ISeatTypeBasedProps {
  geographicType: IStateCategoryDependentProps[] | [];
  specialQuota: IStateCategoryDependentProps[] | [];
}
export interface IGeographicAreaBasedProps {
  gender: IStateCategoryDependentProps[] | [];
  pastrolGroup: IStateCategoryDependentProps[] | [];
}
const NeetPredictorForm: React.FC<INeetPredictorFormProps> = ({ stateList, indiaCategoryList }) => {
  const dispatch = useDispatch();
  const router = useRouter();
  const neetData = useSelector((state) => state.neetPredictor.neetPredictorFormData);

  const [selectedState, setSeletedState] = useState<IDropDownProps | null>();
  const [selectedIndiaCategory, setSelectedIndiaCategory] = useState<IDropDownProps | null>(null);
  const [selectedStateCategry, setSelectedStateCategry] = useState<IDropDownProps | null>();
  const [selectedCollegeRegion, setSelectedCollegeRegion] = useState<IDropDownProps | null>();
  const [selectedBelongs, setSelectedBelongs] = useState<IDropDownProps | null>();
  const [selectedSubCaste, setSelectedSubCaste] = useState<IDropDownProps | null>();
  const [selectedSeatType, setSelectedSeatType] = useState<IDropDownProps | null>();
  const [selectedGender, setSelectedGender] = useState<IDropDownProps | null>();
  const [selectedMinority, setSelectedMinority] = useState<IDropDownProps | null>();
  const [selectedSplQuota, setSelectedSplQuota] = useState<IDropDownProps | null>();
  const [selectedProvisional, setSelectedProvisional] = useState<IDropDownProps | null>();
  const [selectedGeographicType, setSelectedGeographicType] = useState<IDropDownProps | null>();
  const [selectedPastrolGroup, setSelectedPastrolGroup] = useState<IDropDownProps | null>();

  // Dropdown data state variables
  const [stateData, setStateData] = useState<IDropDownProps[]>([]);
  const [indiaCategoryData, setIndiaCategoryData] = useState<IDropDownProps[]>([]);
  const [stateCategoryData, setstateCategoryData] = useState<IDropDownProps[]>([]);
  const [collegeRegionData, setCollegeRegionData] = useState<IDropDownProps[]>([]);
  const [belongsData, setBelongsData] = useState<IDropDownProps[]>([]);
  const [subCasteData, setSubCasteData] = useState<IDropDownProps[]>([]);
  const [seatTypeData, setSeatTypeData] = useState<IDropDownProps[]>([]);
  const [genderData, setGenderData] = useState<IDropDownProps[]>([]);
  const [minorityData, setMinorityData] = useState<IDropDownProps[]>([]);
  const [splQuotaData, setSplQuotaData] = useState<IDropDownProps[]>([]);
  const [speciallyAbledData, setSpeciallyAbledData] = useState<IDropDownProps[]>([]);
  const [ProvisionalData, setProvisionalData] = useState<IDropDownProps[]>([]);
  const [geographicTypeData, setGeographicTypeData] = useState<IDropDownProps[]>([]);
  const [pastrolGroupData, setPastrolGroupData] = useState<IDropDownProps[]>([]);

  // Form validation schema
  const belongsValidation =
    belongsData.length > 0
      ? Yup.string().required(ErrorMessage.BELONGS)
      : pastrolGroupData.length > 0
        ? Yup.string().required(ErrorMessage.PASTROL_GROUP)
        : Yup.string();

  const validationSchema = Yup.object({
    neetRank: Yup.number().notOneOf([0], ErrorMessage.NEET_RANK).required(ErrorMessage.NEET_RANK),
    state:
      stateData.length > 0 ? Yup.number().notOneOf([0], ErrorMessage.STATE).required(ErrorMessage.STATE) : Yup.number(),
    indiaCategory: indiaCategoryData.length > 0 ? Yup.string().required(ErrorMessage.INDIA_CATEGORY) : Yup.string(),
    gender:
      genderData.length > 0
        ? Yup.number().notOneOf([0], ErrorMessage.GENDER).required(ErrorMessage.GENDER)
        : Yup.number(),
    minority: minorityData.length > 0 ? Yup.string().required(ErrorMessage.MINORITY) : Yup.string(),
    specialQuota: splQuotaData.length > 0 ? Yup.string().required(ErrorMessage.SPECIAL_QUOTA) : Yup.string(),
    speciallyAbled: speciallyAbledData.length > 0 ? Yup.number().required(ErrorMessage.SPECIALLY_ABLED) : Yup.number(),
    stateCategory: stateCategoryData.length > 0 ? Yup.string().required(ErrorMessage.STATE_CATEGORY) : Yup.string(),
    collegeRegion: speciallyAbledData.length > 0 ? Yup.number().required(ErrorMessage.COLLEGE_REGION) : Yup.number(),
    belongArea: belongsValidation,
    subCaste:
      subCasteData.length > 0
        ? Yup.number().notOneOf([0], ErrorMessage.SUBCASTE).required(ErrorMessage.SUBCASTE)
        : Yup.number(),
    seatType:
      seatTypeData.length > 0
        ? Yup.number().notOneOf([0], ErrorMessage.SEAT_TYPE).required(ErrorMessage.SEAT_TYPE)
        : Yup.number(),
    provisional:
      ProvisionalData.length > 0
        ? Yup.number().notOneOf([0], ErrorMessage.PROVISIONAL).required(ErrorMessage.PROVISIONAL)
        : Yup.number(),
    geoArea: geographicTypeData.length > 0 ? Yup.string().required(ErrorMessage.GEOGRAPHIC_TYPE) : Yup.string()
  });
  // Formik hook
  const formik = useFormik({
    initialValues: {
      neetRank: 0,
      state: 0,
      seatType: 0,
      provisional: 0,
      collegeRegion: 0,
      indiaCategory: '',
      stateCategory: '',
      speciallyAbled: 0,
      minority: '',
      specialQuota: '',
      gender: 0,
      subCaste: 0,
      belongArea: '',
      geoArea: '',
      rankType: NeetPredictorFormContent.RANKTYPE_INDIA
    },
    validationSchema,
    onSubmit: (values) => {
      if (
        values.collegeRegion != 0 ||
        values.gender != 0 ||
        values.minority != '' ||
        values.specialQuota != '' ||
        values.speciallyAbled != 0 ||
        values.belongArea != '' ||
        values.subCaste != 0 ||
        values.seatType != 0 ||
        values.provisional != 0 ||
        values.geoArea != ''
      ) {
        values = {
          ...values,
          rankType: NeetPredictorFormContent.RANKTYPE_STATE
        };
      }
      const postFormData = async () => {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        let response: any;
        if (neetData.neetRank) {
          response = await updateFormData({
            ...values,
            collegeRegion: values.collegeRegion
          });
        } else {
          response = await addFormData({
            ...values,
            collegeRegion: values.collegeRegion
          });
        }

        if (response.status) {
          dispatch(openSnackbar(SuccessSnackbar(NeetPredictorFormContent.SUCCESS_MESSAGE)));
          dispatch(
            getNeetPredictorFormData({
              ...values,
              indiaCategory: values.indiaCategory,
              stateCategory: values.stateCategory
            })
          );
          setTimeout(() => {
            router.push('/predictor/neet-predictor-result/aiq');
          }, 1000);
        } else {
          dispatch(openSnackbar(ErrorSnackbar(NeetPredictorFormContent.FAILURE_MESSAGE)));
          dispatch(hasError(true));
        }
      };
      postFormData();
    }
  });
  const formikDefaultValue = () => {
    formik.setValues({
      neetRank: formik.values.neetRank,
      state: 0,
      indiaCategory: formik.values.indiaCategory,
      stateCategory: formik.values.stateCategory,
      belongArea: '',
      collegeRegion: 0,
      subCaste: 0,
      seatType: 0,
      gender: 0,
      minority: '',
      speciallyAbled: 0,
      specialQuota: '',
      provisional: 0,
      geoArea: '',
      rankType: NeetPredictorFormContent.RANKTYPE_INDIA
    });
  };

  //Handle state value
  const handleStateSelect = async (value: IDropDownProps | null) => {
    formikDefaultValue();
    resetAllState();
    setstateCategoryData([]);
    setSelectedStateCategry(null);
    if (!value) {
      setSelectedIndiaCategory(null);
    }
    setSeletedState(value);
    formik.setFieldValue(FormKeys.STATE, value?.id || '');
  };
  //Handle india Category value
  const handleIndiaCategorySelect = (value: IDropDownProps | null) => {
    setSelectedIndiaCategory(value);
    formik.setFieldValue(FormKeys.INDIA_CATEGORY, value?.label || '');
  };
  //Handle pastrol group value
  const handlePastrolGroupSelect = (value?: IDropDownProps | null) => {
    setSelectedPastrolGroup(value);
    formik.setFieldValue(FormKeys.PASTROL_GROUP, value?.label || '');
  };
  //Handle state Category value
  const handleStateCategorySelect = async (value?: IDropDownProps | null) => {
    const stateId = formik.values.state;
    // const stateCategory = formik.values.stateCategoryType;
    const indiaCategory = formik.values.indiaCategory;
    formikDefaultValue();
    formik.setValues({ ...formik.values, state: stateId, indiaCategory: indiaCategory });
    setSeatTypeData([]);
    setGeographicTypeData([]);
    setPastrolGroupData([]);
    setSelectedSeatType(null);
    setSelectedGeographicType(null);
    setSelectedPastrolGroup(null);

    setSelectedStateCategry(value);
    formik.setFieldValue(FormKeys.STATE_CATEGORY, value?.label || '');
  };

  //Handle Collegeregion value
  const handleCollegeRegionSelect = (value?: IDropDownProps | null) => {
    setSelectedCollegeRegion(value);
    formik.setFieldValue(FormKeys.COLLEGE_REGION, value?.id);
  };
  //Handle belong value
  const handleBelongsSelect = (value?: IDropDownProps | null) => {
    setSelectedBelongs(value);
    formik.setFieldValue(FormKeys.BELONGS, value?.label || '');
  };
  //Handle subcaste value
  const handleSubCasteSelect = (value?: IDropDownProps | null) => {
    setSelectedSubCaste(value);
    formik.setFieldValue(FormKeys.SUBCASTE, value?.id || '');
  };
  //Handle geographictype value
  const handleGeographicTypeSelect = (value?: IDropDownProps | null) => {
    setSelectedGeographicType(value);
    formik.setFieldValue(FormKeys.GEOGRAPHIC_TYPE, value?.label || '');
  };
  //Handle seattype value
  const handleSeatTypeSelect = (value?: IDropDownProps | null) => {
    setSelectedSeatType(value);
    formik.setFieldValue(FormKeys.SEAT_TYPE, value?.id || 0);
  };
  //Handle gender value
  const handleGenderSelect = (value?: IDropDownProps | null) => {
    setSelectedGender(value);
    formik.setFieldValue(FormKeys.GENDER, value?.id || 0);
  };
  //Handle provisitional value
  const handleProvisitionalSelect = (value?: IDropDownProps | null) => {
    setSelectedProvisional(value);
    formik.setFieldValue(FormKeys.PROVISIONAL, value?.id || 0);
  };
  //Handle minority value
  const handleMinoritySelect = (value?: IDropDownProps | null) => {
    setSelectedMinority(value);
    formik.setFieldValue(FormKeys.MINORITY, value?.label || '');
  };
  //Handle specialquota value
  const handleSpecialQuotaSelect = (value?: IDropDownProps | null) => {
    setSelectedSplQuota(value);
    formik.setFieldValue(FormKeys.SPECIAL_QUOTA, value?.label || '');
  };
  //Handle specially abled value
  const handleSpeciallyAbledChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    formik.setFieldValue(FormKeys.SPECIALLY_ABLED, Number(event.target.value || 0));
  };
  useEffect(() => {
    const stateCategoryDropdownData = async () => {
      setSelectedStateCategry(null);
      const response = await getStateCategoryData(formik.values.state);

      if (response) {
        const updatedStateCategory = response.map((stateCategory) => {
          return {
            id: stateCategory.id,
            label: stateCategory.stateCategory
          };
        });
        setstateCategoryData(updatedStateCategory);
      }
    };
    formik.values.state && stateCategoryDropdownData();
  }, [formik.values.state]);
  useEffect(() => {
    formik.setFieldValue(FormKeys.STATE_CATEGORY, selectedStateCategry?.label);
  }, [selectedStateCategry]);
  //reset all states
  function resetAllState() {
    setSelectedCollegeRegion(null);
    setSelectedBelongs(null);
    setSelectedSplQuota(null);
    setSelectedSubCaste(null);
    setSelectedSeatType(null);
    setSelectedMinority(null);
    setSelectedGender(null);
    setSelectedProvisional(null);
    setSelectedPastrolGroup(null);
    setSelectedGeographicType(null);
    setCollegeRegionData([]);
    setBelongsData([]);
    setSubCasteData([]);
    setSeatTypeData([]);
    setGenderData([]);
    setMinorityData([]);
    setSpeciallyAbledData([]);
    setSplQuotaData([]);
    setProvisionalData([]);
    setGeographicTypeData([]);
    setPastrolGroupData([]);
  }

  useEffect(() => {
    resetAllState();
    const stateCategoryBasedData = async () => {
      try {
        const response = await getStateCategoryDependentData(
          formik.values.state,
          replaceSpecialChar(formik.values.stateCategory || '')
        );

        if (response?.collegeRegion && response?.collegeRegion.length > 0) {
          const updatedCollegeRegion = response.collegeRegion.map((collegeRegion) => {
            return {
              id: collegeRegion.id,
              label: collegeRegion.name
            };
          });
          setCollegeRegionData(updatedCollegeRegion);
        }

        if (response?.belongs && response?.belongs.length > 0) {
          const updatedBelongs = response.belongs.map((belongs) => {
            return {
              id: belongs.id,
              label: belongs.name
            };
          });
          setBelongsData(updatedBelongs);
        }
        if (response?.specialQuota && response?.specialQuota.length > 0) {
          const updatedSplQuota = response.specialQuota.map((specialQuota) => {
            return {
              id: specialQuota.id,
              label: specialQuota.name
            };
          });
          setSplQuotaData(updatedSplQuota);
        }

        if (response?.subCasteData && response?.subCasteData.length > 0) {
          const updatedSubcaste = response.subCasteData.map((subCaste) => {
            return {
              id: subCaste.id,
              label: subCaste.name
            };
          });
          setSubCasteData(updatedSubcaste);
        }
        if (response?.seatType && response?.seatType.length > 0) {
          const updatedSeatType = response.seatType.map((seatType) => {
            return {
              id: seatType.id,
              label: seatType.name
            };
          });
          setSeatTypeData(updatedSeatType);
        }
        if (response?.minority && response?.minority.length > 0) {
          const updatedMinority = response.minority.map((minority) => {
            return {
              id: minority.id,
              label: minority.name
            };
          });
          setMinorityData(updatedMinority);
        }
        if (response?.gender && response?.gender.length > 0) {
          const updatedGender = response.gender.map((gender) => {
            return {
              id: gender.id,
              label: gender.name
            };
          });
          setGenderData(updatedGender);
        }
        if (response?.speciallyAbled && response?.speciallyAbled.length > 0) {
          const updatedSpeciallyAbled = response.speciallyAbled.map((speciallyAbled) => {
            return {
              id: speciallyAbled.id,
              label: speciallyAbled.name
            };
          });
          setSpeciallyAbledData(updatedSpeciallyAbled);
        }
        if (response?.provisitional && response?.provisitional.length > 0) {
          const updatedProvisitional = response.provisitional.map((provisitional) => {
            return {
              id: provisitional.id,
              label: provisitional.name
            };
          });
          setProvisionalData(updatedProvisitional);
        }
      } catch (error) {}
    };
    selectedStateCategry && stateCategoryBasedData();
  }, [neetData.stateCategory, formik.values.stateCategory]);
  useEffect(() => {
    if (stateList) {
      const updatedState = stateList.map((state) => {
        return {
          id: state.stateId,
          label: state.stateName
        };
      });
      setStateData(updatedState);
    }
    if (indiaCategoryList) {
      const updatedCategory = indiaCategoryList.map((category) => {
        return {
          id: category.id,
          label: category.indiaCategory
        };
      });
      setIndiaCategoryData(updatedCategory);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [stateList, indiaCategoryList]);

  useEffect(() => {
    setSelectedGeographicType(null);
    setSelectedSplQuota(null);
    setGeographicTypeData([]);
    setPastrolGroupData([]);
    setSplQuotaData([]);
    const seatTypeBasedData = async () => {
      const seatTypeResponse = await getStateSeatBasedData(formik.values.state, formik.values.seatType);

      if (seatTypeResponse.geographicType.length > 0) {
        const updatedGeographicType = seatTypeResponse.geographicType.map((geographicType) => {
          return {
            id: geographicType.id,
            label: geographicType.name
          };
        });
        setGeographicTypeData(updatedGeographicType);
      }
      if (seatTypeResponse.specialQuota.length > 0) {
        const updatedSplQuota = seatTypeResponse.specialQuota.map((specialQuota) => {
          return {
            id: specialQuota.id,
            label: specialQuota.name
          };
        });
        setSplQuotaData(updatedSplQuota);
      }
    };

    selectedStateCategry && seatTypeBasedData();
  }, [formik.values.seatType, formik.values.state, formik.values.stateCategory, neetData.geoArea]);

  useEffect(() => {
    const geographicAreaBasedData = async () => {
      const seatTypeResponse = await getGeographicAreaBasedData(
        formik.values.state,
        formik.values.seatType,
        formik.values.geoArea
      );

      if (seatTypeResponse.pastrolGroup.length > 0) {
        const updatedPastrolGroup = seatTypeResponse.pastrolGroup.map((pastrolGroup) => {
          return {
            id: pastrolGroup.id,
            label: pastrolGroup.name
          };
        });
        setPastrolGroupData(updatedPastrolGroup);
      }
    };

    geographicAreaBasedData();
  }, [selectedGeographicType, selectedSeatType]);
  useEffect(() => {
    if (neetData.state && !selectedState) {
      const selectedStateData = stateList.find((stateData) => stateData.stateId === neetData.state);
      setSeletedState({
        id: selectedStateData?.stateId,
        label: selectedStateData?.stateName || ''
      });
    }
    if (neetData.indiaCategory && !selectedIndiaCategory) {
      const selectedIndiaCategoryData = indiaCategoryList.find(
        (indiaCategory) => indiaCategory.indiaCategory == neetData.indiaCategory
      );
      setSelectedIndiaCategory({
        id: selectedIndiaCategoryData?.id,
        label: selectedIndiaCategoryData?.indiaCategory
      });
    }
    if (neetData.stateCategory && !selectedStateCategry?.label) {
      const selectedStateCategoryData = stateCategoryData.find(
        (stateCategory) => stateCategory.label === neetData.stateCategory
      );
      setSelectedStateCategry({
        id: selectedStateCategoryData?.id,
        label: selectedStateCategoryData?.label
      });
    }
    if (neetData.seatType && !selectedSeatType?.id) {
      const selectedSeatTypeData = seatTypeData.find((seatType) => seatType.id === neetData.seatType);

      selectedSeatTypeData &&
        setSelectedSeatType({
          id: selectedSeatTypeData?.id,
          label: selectedSeatTypeData?.label
        });
    }
    if (neetData.geoArea && !selectedGeographicType?.label) {
      const setSelectedGeographicTypeData = geographicTypeData.find((geoArea) => geoArea.label === neetData.geoArea);
      setSelectedGeographicType({
        id: setSelectedGeographicTypeData?.id,
        label: setSelectedGeographicTypeData?.label
      });
    }
    if (neetData.belongArea && !selectedPastrolGroup?.id) {
      const submittedbelongsData = pastrolGroupData.find((belongs) => belongs.label === neetData.belongArea);

      setSelectedPastrolGroup({
        id: submittedbelongsData?.id,
        label: submittedbelongsData?.label
      });
    }
    if (neetData.belongArea && !selectedBelongs?.label) {
      const submittedBelongsData = belongsData.find((belongs) => belongs.label === neetData.belongArea);

      setSelectedBelongs({
        id: submittedBelongsData?.id,
        label: submittedBelongsData?.label
      });
    }
    if (String(neetData.collegeRegion) && !selectedCollegeRegion?.id) {
      const submittedRegionData = collegeRegionData.find((regionData) => regionData.id === neetData.collegeRegion);

      setSelectedCollegeRegion({
        id: submittedRegionData?.id,
        label: submittedRegionData?.label
      });
    }
    if (neetData.subCaste && !selectedSubCaste?.id) {
      const submittedSubcasteData = subCasteData.find((subCaste) => subCaste.id === neetData.subCaste);

      setSelectedSubCaste({
        id: submittedSubcasteData?.id,
        label: submittedSubcasteData?.label
      });
    }
    if (neetData.specialQuota && !selectedSplQuota?.label) {
      const submittedSplQuotaData = splQuotaData.find((splQuota) => splQuota.label === neetData.specialQuota);

      setSelectedSplQuota({
        id: submittedSplQuotaData?.id,
        label: submittedSplQuotaData?.label
      });
    }
    if (neetData.minority && !selectedMinority?.label) {
      const submittedMinorityData = minorityData.find((minority) => minority.label === neetData.minority);

      setSelectedMinority({
        id: submittedMinorityData?.id,
        label: submittedMinorityData?.label
      });
    }
    if (neetData.provisional && !selectedProvisional?.id) {
      const submittedProvisionalData = ProvisionalData.find((provisional) => provisional.id === neetData.provisional);

      setSelectedProvisional({
        id: submittedProvisionalData?.id,
        label: submittedProvisionalData?.label
      });
    }
    if (neetData.gender && !selectedGender?.id) {
      const submittedGenderData = genderData.find((genderData) => genderData.id === neetData.gender);

      setSelectedGender({
        id: submittedGenderData?.id,
        label: submittedGenderData?.label
      });
    }
  }, [
    neetData,
    subCasteData,
    seatTypeData,
    belongsData,
    geographicTypeData,
    stateCategoryData,
    pastrolGroupData,
    collegeRegionData,
    splQuotaData,
    minorityData,
    ProvisionalData,
    genderData
  ]);

  useEffect(() => {
    if (neetData.neetRank) {
      formik.setValues({
        ...formik.values,
        neetRank: neetData.neetRank,
        state: neetData.state,
        indiaCategory: neetData.indiaCategory,
        stateCategory: neetData.stateCategory,
        speciallyAbled: neetData.speciallyAbled ?? 0,
        belongArea: neetData.belongArea || '',
        gender: neetData.gender,
        geoArea: neetData.geoArea || '',
        minority: neetData.minority,
        provisional: neetData.provisional,
        collegeRegion: neetData.collegeRegion ?? 0,
        seatType: neetData.seatType,
        specialQuota: neetData.specialQuota,
        subCaste: neetData.subCaste
      });
    }
  }, [neetData.neetRank]);

  return (
    <Box className={styles.formContainer} data-test-id="neet-predictor-form">
      <Box className={styles.headingWrapper}>
        <Typography className={styles.formHeading}>{NeetPredictorFormContent.FORM_TITLE}</Typography>
      </Box>
      <Box component={'form'} noValidate onSubmit={formik.handleSubmit}>
        <Box className={styles.inputWrapper}>
          <InputLabel className={styles.inputHeading} htmlFor="rank">
            {NeetPredictorFormContent.NEET_RANK}
          </InputLabel>
          <TextField
            id="neetRank"
            name="neetRank"
            placeholder={FormPlaceholderContent.NEET_RANK}
            sx={{
              width: '100%',
              backgroundColor: '#f8fafc',
              '& input': {
                backgroundColor: 'transparent',
                border: 'none',
                outline: 'none'
              },
              '& fieldset': {
                borderColor: '#f8fafc'
              }
            }}
            InputProps={{
              classes: {
                input: styles['custom-input'],
                notchedOutline: styles['custom-fieldset']
              }
            }}
            type="number"
            value={formik.values.neetRank > 0 && formik.values.neetRank}
            onChange={(e) => {
              const inputValue = e.target.value;

              if (!/^\d*$/.test(inputValue) || inputValue.length > 9) {
                e.preventDefault();
              } else {
                formik.handleChange(e);
              }
            }}
            onKeyDown={(e) => {
              if (e.key === '.' || e.key === 'e') {
                e.preventDefault();
              }
            }}
            data-test-id="neet-predictor-form-rank"
          />
          {formik.touched.neetRank && formik.errors.neetRank && (
            <Typography className={styles.predictorFormError}>{formik.errors.neetRank}</Typography>
          )}
        </Box>
        <Box className={styles.inputWrapper}>
          <InputLabel className={styles.inputHeading} htmlFor="state">
            {NeetPredictorFormContent.SELECT_STATE}
          </InputLabel>
          <CustomDropdown
            placeholder={FormPlaceholderContent.SELECT_STATE}
            id="state"
            dropDownData={stateData}
            handleChange={handleStateSelect}
            value={selectedState}
            data-test-id="neet-predictor-form-state"
          />
          {formik.touched.state && formik.errors.state && (
            <Typography className={styles.predictorFormError}>{formik.errors.state}</Typography>
          )}
        </Box>
        <Box className={styles.inputWrapper}>
          <InputLabel className={styles.inputHeading} htmlFor="categoryType">
            {NeetPredictorFormContent.INDIA_CATEGORY}
          </InputLabel>
          <CustomDropdown
            dropDownData={indiaCategoryData}
            value={selectedIndiaCategory}
            handleChange={handleIndiaCategorySelect}
            placeholder={FormPlaceholderContent.INDIA_CATEGORY}
            id="categoryType"
            data-test-id="neet-predictor-form-categoryType"
          />
          {formik.touched.indiaCategory && formik.errors.indiaCategory && (
            <Typography className={styles.predictorFormError}>{formik.errors.indiaCategory}</Typography>
          )}
        </Box>
        {stateCategoryData.length > 0 && (
          <Box className={styles.inputWrapper}>
            <InputLabel className={styles.inputHeading} htmlFor="stateCategoryType">
              {NeetPredictorFormContent.STATE_CATEGORY}
            </InputLabel>

            <CustomDropdown
              placeholder={FormPlaceholderContent.STATE_CATEGORY}
              id="stateCategoryType"
              dropDownData={stateCategoryData}
              handleChange={handleStateCategorySelect}
              value={selectedStateCategry}
              data-test-id="neet-predictor-form-stateCategoryType"
            />
            {formik.touched.stateCategory && formik.errors.stateCategory && (
              <Typography className={styles.predictorFormError}>{formik.errors.stateCategory}</Typography>
            )}
          </Box>
        )}
        {collegeRegionData.length > 0 && (
          <Box className={styles.inputWrapper}>
            <InputLabel className={styles.inputHeading} htmlFor="region">
              {NeetPredictorFormContent.COLLEGE_REGION}
            </InputLabel>
            {
              <CustomDropdown
                placeholder={FormPlaceholderContent.COLLEGE_REGION}
                id="region"
                dropDownData={collegeRegionData}
                handleChange={handleCollegeRegionSelect}
                value={selectedCollegeRegion}
                data-test-id="neet-predictor-form-region"
              />
            }
            {formik.touched.collegeRegion && formik.errors.collegeRegion && (
              <Typography className={styles.predictorFormError}>{formik.errors.collegeRegion}</Typography>
            )}
          </Box>
        )}
        {belongsData.length > 0 && (
          <Box className={styles.inputWrapper}>
            <InputLabel className={styles.inputHeading} htmlFor="belongs">
              {`${NeetPredictorFormContent.BELONGS}${selectedState?.label}?`}
            </InputLabel>
            {
              <CustomDropdown
                placeholder={FormPlaceholderContent.BELONGS}
                id="belongs"
                dropDownData={belongsData}
                handleChange={handleBelongsSelect}
                value={selectedBelongs}
                data-test-id="neet-predictor-form-belongs"
              />
            }
            {formik.touched.belongArea && formik.errors.belongArea && (
              <Typography className={styles.predictorFormError}>{formik.errors.belongArea}</Typography>
            )}
          </Box>
        )}
        {subCasteData.length > 0 && (
          <Box className={styles.inputWrapper}>
            <InputLabel className={styles.inputHeading} htmlFor="subCaste">
              {NeetPredictorFormContent.SUBCASTE}
            </InputLabel>
            {
              <CustomDropdown
                placeholder={FormPlaceholderContent.SUBCASTE}
                id="subCaste"
                dropDownData={subCasteData}
                handleChange={handleSubCasteSelect}
                value={selectedSubCaste}
                data-test-id="neet-predictor-form-subCaste"
              />
            }
            {formik.touched.subCaste && formik.errors.subCaste && (
              <Typography className={styles.predictorFormError}>{formik.errors.subCaste}</Typography>
            )}
          </Box>
        )}
        {seatTypeData.length > 0 && (
          <Box className={styles.inputWrapper}>
            <InputLabel className={styles.inputHeading} htmlFor="seatType">
              {NeetPredictorFormContent.SEAT_TYPE}
            </InputLabel>
            {
              <CustomDropdown
                placeholder={FormPlaceholderContent.SEAT_TYPE}
                id="seatType"
                dropDownData={seatTypeData}
                handleChange={handleSeatTypeSelect}
                value={selectedSeatType}
                data-test-id="neet-predictor-form-seatType"
              />
            }
            {formik.touched.seatType && formik.errors.seatType && (
              <Typography className={styles.predictorFormError}>{formik.errors.seatType}</Typography>
            )}
          </Box>
        )}
        {genderData.length > 0 && (
          <Box className={styles.inputWrapper}>
            <InputLabel className={styles.inputHeading} htmlFor="gender">
              {NeetPredictorFormContent.GENDER}
            </InputLabel>
            {
              <CustomDropdown
                placeholder={FormPlaceholderContent.GENDER}
                id="gender"
                dropDownData={genderData}
                handleChange={handleGenderSelect}
                value={selectedGender}
                data-test-id="neet-predictor-form-gender"
              />
            }
            {formik.touched.gender && formik.errors.gender && (
              <Typography className={styles.predictorFormError}>{formik.errors.gender}</Typography>
            )}
          </Box>
        )}
        {ProvisionalData.length > 0 && (
          <Box className={styles.inputWrapper}>
            <InputLabel className={styles.inputHeading} htmlFor="Provisional">
              {NeetPredictorFormContent.PROVISIONAL}
            </InputLabel>
            {
              <CustomDropdown
                placeholder={FormPlaceholderContent.PROVISIONAL}
                id="Provisional"
                dropDownData={ProvisionalData}
                handleChange={handleProvisitionalSelect}
                value={selectedProvisional}
                data-test-id="neet-predictor-form-Provisional"
              />
            }
            {formik.touched.provisional && formik.errors.provisional && (
              <Typography className={styles.predictorFormError}>{formik.errors.provisional}</Typography>
            )}
          </Box>
        )}
        {geographicTypeData.length > 0 && (
          <Box className={styles.inputWrapper}>
            <InputLabel className={styles.inputHeading} htmlFor="geographicType">
              {NeetPredictorFormContent.GEOGRAPHIC_TYPE}
            </InputLabel>
            {
              <CustomDropdown
                placeholder={FormPlaceholderContent.GEOGRAPHIC_TYPE}
                id="geographicType"
                dropDownData={geographicTypeData}
                handleChange={handleGeographicTypeSelect}
                value={selectedGeographicType}
                data-test-id="neet-predictor-form-geographicType"
              />
            }
            {formik.touched.geoArea && formik.errors.geoArea && (
              <Typography className={styles.predictorFormError}>{formik.errors.geoArea}</Typography>
            )}
          </Box>
        )}
        {pastrolGroupData.length > 0 && (
          <Box className={styles.inputWrapper}>
            <InputLabel className={styles.inputHeading} htmlFor="pastrolGroup">
              {NeetPredictorFormContent.PASTROL_GROUP}
            </InputLabel>
            {
              <CustomDropdown
                placeholder={FormPlaceholderContent.PASTROL_GROUP}
                id="pastrolGroup"
                dropDownData={pastrolGroupData}
                handleChange={handlePastrolGroupSelect}
                value={selectedPastrolGroup}
                data-test-id="neet-predictor-form-pastrolGroup"
              />
            }
            {formik.touched.belongArea && formik.errors.belongArea && (
              <Typography className={styles.predictorFormError}>{formik.errors.belongArea}</Typography>
            )}
          </Box>
        )}
        {minorityData.length > 0 && (
          <Box className={styles.inputWrapper}>
            <InputLabel className={styles.inputHeading} htmlFor="minority">
              {NeetPredictorFormContent.MINORITY}
            </InputLabel>
            {
              <CustomDropdown
                placeholder={FormPlaceholderContent.MINORITY}
                id="minority"
                dropDownData={minorityData}
                handleChange={handleMinoritySelect}
                value={selectedMinority}
                data-test-id="neet-predictor-form-minority"
              />
            }
            {formik.touched.minority && formik.errors.minority && (
              <Typography className={styles.predictorFormError}>{formik.errors.minority}</Typography>
            )}
          </Box>
        )}
        {splQuotaData.length > 0 && (
          <Box className={styles.inputWrapper}>
            <InputLabel className={styles.inputHeading} htmlFor="specialQuota">
              {NeetPredictorFormContent.SPECIAL_QUOTA}
            </InputLabel>
            <CustomDropdown
              placeholder={FormPlaceholderContent.SPECIAL_QUOTA}
              id="specialQuota"
              dropDownData={splQuotaData}
              handleChange={handleSpecialQuotaSelect}
              value={selectedSplQuota}
              data-test-id="neet-predictor-form-specialQuota"
            />
            {formik.touched.specialQuota && formik.errors.specialQuota && (
              <Typography className={styles.predictorFormError}>{formik.errors.specialQuota}</Typography>
            )}
          </Box>
        )}
        {speciallyAbledData.length > 0 && (
          <Box className={styles.inputWrapper}>
            <InputLabel className={styles.inputHeading} htmlFor="abled">
              {NeetPredictorFormContent.SPECIALLY_ABLED}
            </InputLabel>
            <RadioGroup
              aria-labelledby="demo-radio-buttons-group-label"
              name="radio-buttons-group"
              id="abled"
              data-test-id="neet-predictor-form-abled"
            >
              <Box className={styles.radioButtonWrapper}>
                {speciallyAbledData &&
                  speciallyAbledData.map((data, index) => (
                    <FormControlLabel
                      value={data.id}
                      control={
                        <Radio
                          checked={data.id === formik.values.speciallyAbled}
                          onChange={handleSpeciallyAbledChange}
                        />
                      }
                      label={data.label}
                      key={index}
                    />
                  ))}
              </Box>
              {formik.touched.speciallyAbled && formik.errors.speciallyAbled && (
                <Typography className={styles.predictorFormError}>{formik.errors.speciallyAbled}</Typography>
              )}
            </RadioGroup>
          </Box>
        )}
        <Button type="submit" className={styles.submitBtn} data-test-id="Form-submit">
          {NeetPredictorFormContent.SUBMIT}
        </Button>
      </Box>
    </Box>
  );
};

export default NeetPredictorForm;
