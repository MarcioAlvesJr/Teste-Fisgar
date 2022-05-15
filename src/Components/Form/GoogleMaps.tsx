import * as React from 'react';
import Box from '@mui/material/Box';
import Autocomplete from '@mui/material/Autocomplete';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import parse from 'autosuggest-highlight/umd/parse';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import { debounce, TextField, useMediaQuery } from '@mui/material';
import { useFormikContext } from 'formik';
import useCheckAdressNumber from './useCheckAdressNumber';
import { CustomCollapse } from './connectedFields/TextField';
import { StepperWrapperContext } from '../StepperWrapper/StepperWrapper';
import { mobileMaxPx } from '../StepperWrapper/StepperWrapper.styles';
import { useDebounce } from 'usehooks-ts';
const GOOGLE_MAPS_API_KEY = process.env.REACT_APP_GOOGLE_MAPS_API_KEY

function loadScript(src: string, position: HTMLElement | null, id: string) {
  if (!position) {
    return;
  }

  const script = document.createElement('script');
  script.setAttribute('async', '');
  script.setAttribute('id', id);
  script.src = src;
  position.appendChild(script);
}

const autocompleteService = { current: null };

interface MainTextMatchedSubstrings {
  offset: number;
  length: number;
}
interface StructuredFormatting {
  main_text: string;
  secondary_text: string;
  main_text_matched_substrings: readonly MainTextMatchedSubstrings[];
}
export interface PlaceType {
  description: string;
  structured_formatting: StructuredFormatting;
}

export default function GoogleMaps({width}) {
  const {FormMapWrapperWidth} = React.useContext(StepperWrapperContext)
  useCheckAdressNumber()
  const name = "address"
  const formik:any = useFormikContext()

  const textFieldProps = {
    error: Boolean(formik.errors[name]),
    helperText: formik.errors[name],
    onBlur:formik.handleBlur
  }

  const value = formik.values[name]
  const setValue = value =>formik.setFieldValue(name, value)

  const [inputValue, setInputValue] = React.useState('');
  const [options, setOptions] = React.useState<readonly PlaceType[]>([]);
  const loaded = React.useRef(false);

  if (typeof window !== 'undefined' && !loaded.current) {
    if (!document.querySelector('#google-maps')) {
      loadScript(
        `https://maps.googleapis.com/maps/api/js?key=${GOOGLE_MAPS_API_KEY}&libraries=places&language=pt-BR`,
        document.querySelector('head'),
        'google-maps',
      );
    }

    loaded.current = true;
  }

  const fetch = React.useMemo(
    () =>
      debounce(
        (
          request: { input: string, language: string },
          callback: (results?: readonly PlaceType[]) => void,
        ) => {
          (autocompleteService.current as any).getPlacePredictions(
            request,
            callback,
          );
        },
        200,
      ),
    [],
  );

  React.useEffect(() => {
    let active = true;

    if (!autocompleteService.current && (window as any).google) {
      autocompleteService.current = new (
        window as any
      ).google.maps.places.AutocompleteService();
    }
    if (!autocompleteService.current) {
      return undefined;
    }

    if (inputValue === '') {
      setOptions(value ? [value] : []);
      return undefined;
    }

    fetch({ input: inputValue, language: 'pt' }, (results?: readonly PlaceType[]) => {
      if (active) {
        let newOptions: readonly PlaceType[] = [];

        if (value) {
          newOptions = [value];
        }

        if (results) {
          newOptions = [...newOptions, ...results];
        }

        setOptions(newOptions);
      }
    });

    return () => {
      active = false;
    };
  }, [value, inputValue, fetch]);

  const mobile = useMediaQuery(`(max-width:${mobileMaxPx}px)`);

  const autocompleteAutoWidth = useDebounce({
    //Makes input stretch when parent gets bigger
    width,
    //Makes input shrink when parent gets smaller 
    maxWidth: mobile? `calc(${FormMapWrapperWidth}px)` : 
    `calc(calc(${FormMapWrapperWidth}px - 1rem) /2)` 
  }, 500)


  return (
    <div id="address-wrapper">
    <Autocomplete
      sx={autocompleteAutoWidth}
      getOptionLabel={(option) =>
        typeof option === 'string' ? option : option.description
      }
      filterOptions={(x) => x}
      options={options}
      autoComplete
      includeInputInList
      filterSelectedOptions
      value={value}
      onChange={(event: any, newValue: PlaceType | null) => {
        setOptions(newValue ? [newValue, ...options] : options);
        setValue(newValue);
      }}
      onInputChange={(event, newInputValue) => {
        setInputValue(newInputValue);
      }}
      renderInput={(params) => (
        <TextField name={name}  {...params} variant="standard" label="Endereço" fullWidth {...textFieldProps} helperText={<CustomCollapse text={textFieldProps.helperText}/>}/>
      )}
      renderOption={(props, option) => {
        const matches = option.structured_formatting.main_text_matched_substrings;
        const parts = parse(
          option.structured_formatting.main_text,
          matches.map((match: any) => [match.offset, match.offset + match.length]),
        );

        return (
          <li {...props}>
            <Grid container alignItems="center">
              <Grid item>
                <Box
                  component={LocationOnIcon}
                  sx={{ color: 'text.secondary', mr: 2 }}
                />
              </Grid>
              <Grid item xs>
                {parts.map((part, index) => (
                  <span
                    key={index}
                    style={{
                      fontWeight: part.highlight ? 700 : 400,
                    }}
                  >
                    {part.text}
                  </span>
                ))}
                <Typography variant="body2" color="text.secondary">
                  {option.structured_formatting.secondary_text}
                </Typography>
              </Grid>
            </Grid>
          </li>
        );
      }}
    /></div>
  );
}
