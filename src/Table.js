import React from 'react'
import {Table , TableBody ,TableCell,TableRow} from '@material-ui/core';
import {makeStyles} from '@material-ui/core/styles';


const useStyle= makeStyles((theme)=>({
    tableDiv:{
        marginTop:'20px',
        overflowY:'scroll',
        height:'400px',
    },
    
}))

function CasesTable(props) {
    const tableData=props.countries;

    const classes=useStyle();

    return (


        <div className={classes.tableDiv}>
            <Table className={classes.table}>
            <TableBody className="table">
               {
                tableData.map(
                    (country)=>{
                        return (
                        <TableRow key={country.countryInfo.iso2}>
                            <TableCell align="left">
                                {country.country}
                            </TableCell>
                            <TableCell align="right">
                                {country.cases}
                            </TableCell>
                        </TableRow>
                    )}
                )
               }
            </TableBody>
            </Table>
            
        </div>
    )
}

export default CasesTable;