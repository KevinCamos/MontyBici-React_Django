import React, { useContext } from 'react';
import { Helmet } from "react-helmet";
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Switch, Box, Grid, Select, MenuItem, FormControl, InputLabel } from '@mui/material';
import useAdminPoint from "../../../hooks/Admin/useAdminPoint";
import useAdminBike from "../../../hooks/Admin/useAdminBike";
import Loading from "../../../components/Templates-Suspense/Loading"
import AdminContext from '../../../context/Admin/AdminContext'

export default function AdminPoint() {
    const { isLoadingPoint, updatePoint, updatePointsBike, isBikeUpdate, setIsBikeUpdate, updateBikePoint } = useAdminPoint()
    const { updateBike, pointIndex, setPointIndex, isLoading } = useAdminBike({ isPageAdminBike: false })
    const { bikes, setBikes, points, setPoints } = useContext(AdminContext)

    if (pointIndex !== -1) {
        let updatePoints = [...points]
        updatePoints[pointIndex].bike.active = !updatePoints[pointIndex].bike.active;
        setPointIndex(-1)
        setPoints(updatePoints)
    }

    if (isBikeUpdate) {
        setIsBikeUpdate(false)
        let updateBikes = bikes.map(function (bike) {
            if (updateBikePoint.bike.id === bike.id) {
                if (updateBikePoint.points) bike.points = { "id": updateBikePoint.points }
                else bike.points = null
            }
            return bike
        })
        let newArrBikes = [...updateBikes]
        setBikes(newArrBikes)
    }


    return (
        <>
            {(isLoadingPoint || isLoading) && <Loading />}
            <Helmet>
                <title>Factoy MontyPoints</title>
            </Helmet>
            <Grid container maxWidth="md">

                <Box sx={{
                    marginTop: 8,
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                }}>

                    <TableContainer component={Paper} >

                        <Table sx={{ minWidth: 800 }} aria-label="caption table">
                            <caption>Estaciones MontyBicis</caption>
                            <TableHead>
                                <TableRow>
                                    <TableCell align="left">ID Point</TableCell>
                                    <TableCell align="center">Station</TableCell>
                                    <TableCell align="center">Active Point</TableCell>
                                    <TableCell align="center">ID Bike</TableCell>
                                    <TableCell align="center">Active Bike</TableCell>
                                    <TableCell align="center" sx={{ minWidth: 500 }}>Update Bike</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {points.map((point) => (
                                    <TableRow key={point.id}>
                                        <TableCell component="th" align="left">{point.id}</TableCell>
                                        <TableCell align="center">{point.station ? point.station.name : <b>-</b>}</TableCell>
                                        <TableCell align="center"> {point.active
                                            ? <Switch defaultValue={point ? point : false} value={point.active ?? " "} defaultChecked onClick={(e) => updatePoint(point.id, !point.active, points)} />
                                            : <Switch defaultValue={point ? point : false} value={!point.active ?? " "} onClick={(e) => updatePoint(point.id, !point.active, points)} />
                                        } </TableCell>
                                        <TableCell align="center">{point.bike ? point.bike.id : <b>-</b>}</TableCell>
                                        {!point.bike ? <TableCell align="center"><b>-</b></TableCell> :
                                            <TableCell align="center"> {point.bike.active
                                                ? <Switch defaultValue={point ? point : false} value={point.bike.active ?? " "} defaultChecked onClick={(e) => updateBike(point.bike.id, !point.bike.active, bikes)} />
                                                : <Switch defaultValue={point ? point : false} value={!point.bike.active ?? " "} onClick={(e) => updateBike(point.bike.id, !point.bike.active, bikes)} />
                                            } </TableCell>}
                                        <TableCell align="center">
                                            <FormControl fullWidth>
                                                <InputLabel id="points">MontyPoints</InputLabel>
                                                <Select
                                                    onChange={e => updatePointsBike(point.id, e.target.value, points, point.id)}

                                                    inputProps={{ 'aria-label': 'Añade una bici' }}
                                                    defaultValue={point.bike ? point.bike.id : false}
                                                    displayEmpty
                                                    value={point.bike ? point.bike.id : false}>


                                                    <MenuItem value={false} ><em>-</em></MenuItem>
                                                    {bikes.sort((a, b) => a.id - b.id).map((bike, index) => (

                                                        <MenuItem value={parseInt(bike.id)} key={point.id + "bike" + bike.id}>
                                                            {`Bici ${bike.id}; ${bike.active ? "Activa" : "Deshabilitada"}; ${bike.points ? `Punto ${bike.points.id}` : "En ningún punto o en uso"}`}
                                                        </MenuItem>
                                                    ))}

                                                </Select>
                                            </FormControl>
                                        </TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </TableContainer>
                </Box>
            </Grid>
        </>
    );
}
