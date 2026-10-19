import {useState, useEffect} from 'react'
import AxiosInstance from './Axios'
import {Alert, Box, Typography} from '@mui/material'
import AddBoxIcon from '@mui/icons-material/AddBox';
import TextForm from './forms/TextForm';
import SelectForm from './forms/SelectForm';
import MultiSelectForm from './forms/MultiSelectForm';
import DescriptionForm from './forms/DescriptionForm';
import Button from '@mui/material/Button';
import {useFormik} from 'formik';

const Create = () =>{
    const [country, setCountry] = useState([])
    const [league, setLeague] = useState([])
    const [characteristic, setCharacteristic] = useState([])
    const [loadingOptions, setLoadingOptions] = useState(true)
    const [loadError, setLoadError] = useState('')
    const [submitError, setSubmitError] = useState('')
    const [success, setSuccess] = useState(false)

    const GetData = () =>{
        Promise.all([
            AxiosInstance.get('country/'),
            AxiosInstance.get('league/'),
            AxiosInstance.get('characteristic/'),
        ])
            .then(([countries, leagues, characteristics]) => {
                setCountry(countries.data)
                setLeague(leagues.data)
                setCharacteristic(characteristics.data)
            })
            .catch((error) => {
                setLoadError(error.response?.data?.detail || error.message || 'Could not load club options.')
            })
            .finally(() => {
                setLoadingOptions(false)
            })
    }

    useEffect(() =>{
        GetData()
    },[])

    const formik = useFormik({
        initialValues:{
            name: "",
            description:"",
            country:"",
            league: "",
            attendance:"",
            city:"",
            characteristic:[],
        },

        onSubmit: async (values, {resetForm}) => {
            setSubmitError('')
            setSuccess(false)
            try {
                await AxiosInstance.post('footballclub/', {
                    ...values,
                    attendance: values.attendance === '' ? null : Number(values.attendance),
                })
                resetForm()
                setSuccess(true)
            } catch (error) {
                const data = error.response?.data
                setSubmitError(
                    data
                        ? Object.entries(data)
                            .map(([field, messages]) => `${field}: ${Array.isArray(messages) ? messages.join(', ') : messages}`)
                            .join(' ')
                        : error.message || 'Could not create the club.'
                )
            }
        }
    })

    return(
        <div>
            <form onSubmit={formik.handleSubmit}>
            {loadError && <Alert severity="error" sx={{mb: 2}}>{loadError}</Alert>}
            {submitError && <Alert severity="error" sx={{mb: 2}}>{submitError}</Alert>}
            {success && <Alert severity="success" sx={{mb: 2}}>Club created successfully.</Alert>}

            <Box className={"TopBar"}>
                <AddBoxIcon/>
                <Typography sx={{marginLeft:'15px', fontWeight:'bold'}} variant='subtitle2'>Create a new club!</Typography>
            </Box>

            <Box className={'FormBox'}>
                
                    <Box className={'FormArea'}>
                        <TextForm
                            label = {"Club name"}
                            name='name'
                            value={formik.values.name}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                        />

                        <Box sx={{marginTop:'30px'}}>
                            <TextForm
                                label = {"City"}
                                name='city'
                                value={formik.values.city}
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                            />
                        </Box>
                        

                        <Box sx={{marginTop:'30px'}}>
                            <SelectForm
                                label = {"League"}
                                options = {league}
                                name='league'
                                value={formik.values.league}
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                            />
                        </Box>
                        
                        <Box sx={{marginTop:'30px'}}>
                            <Button type="submit" variant="contained" fullWidth disabled={formik.isSubmitting || loadingOptions || Boolean(loadError)}>
                                {formik.isSubmitting ? 'Creating club…' : 'Submit the data'}
                            </Button>
                        </Box>
                       

                    </Box>
                    

                    <Box className={'FormArea'}>

                        <SelectForm
                            label = {"Country"}
                            options = {country}
                            name='country'
                            value={formik.values.country}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                        />
                        
                        <Box sx={{marginTop:'30px'}}>
                            <TextForm
                                label = {"Attendance"}
                                name='attendance'
                                value={formik.values.attendance}
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                            />

                        </Box>                   

                        <Box sx={{marginTop:'30px'}}>
                            <MultiSelectForm
                                label = {"Characteristics"}
                                options={characteristic}
                                name='characteristic'
                                value={formik.values.characteristic}
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                            />
                        </Box>
                        

                    </Box>


                    <Box className={'FormArea'}>
                         <DescriptionForm
                            label = {"Description"}
                            rows={9}
                            name='description'
                            value={formik.values.description}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                        />
                    </Box>

                    



            </Box>
            </form>
        </div>
    )
}

export default Create