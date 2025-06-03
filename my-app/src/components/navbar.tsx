

import * as React from 'react';
import Button from '@mui/material/Button';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import HomeIcon from '@mui/icons-material/Home';
import FormatListBulletedIcon from '@mui/icons-material/FormatListBulleted';
import FoodBankIcon from '@mui/icons-material/FoodBank';
import Tooltip from '@mui/material/Tooltip';
import PersonIcon from '@mui/icons-material/Person';


export default function BasicMenu() {
    const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
    const open = Boolean(anchorEl);
    const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null);
    };


    const divStyle = {
        margin: 'auto',

    };

    return (
        <div>
            <link href='https://fonts.googleapis.com/css?family=Montserrat' rel='stylesheet'></link>


            <Box sx={{ display: 'flex', alignItems: 'center', /*backgroundColor: '#f5f5f5'*/  height: '60', px: '2' /*, textAlign: 'center', justifyContent: 'center' */ }}>
                <Box sx={{ paddingLeft: '1rem' }}>
                    <Typography variant='h5' component='h5' color='primary' sx={{ fontFamily: 'Montserrat' }}>SMUEats</Typography>
                </Box>
                <div style={divStyle}>
                    <Tooltip title = 'Home' placement = 'top-start'>
                        <Button
                            onClick={handleClick}
                            sx={{
                                fontFamily: `Montserrat`,
                                color: '#0066CC',
                                fontSize: '16px',
                                textTransform: 'None',
                                fontWeight: 'bold'
                            }}
                        >
                            <Box sx={{ display: 'flex', alignItems: 'center' }}>
                                Home &nbsp; <HomeIcon color='primary' />
                            </Box>
                        </Button>
                    </Tooltip>


                    <Tooltip title = 'Orders' placement = 'top-start'>
                            <Button
                        onClick={handleClick}
                        sx={{
                            fontFamily: `Montserrat`,
                            color: '#0066CC',
                            fontSize: '16px',
                            textTransform: 'None',
                            fontWeight: 'bold'
                        }}
                    >
                        <Box sx={{ display: 'flex', alignItems: 'center' }}>
                            Orders &nbsp; <FormatListBulletedIcon color='primary' />
                        </Box>

                    </Button>

                    </Tooltip>
                    

                    <Tooltip placement = 'top-start' title = 'Food'>
                        <Button
                        onClick={handleClick}
                        sx={{
                            fontFamily: `Montserrat`,
                            color: '#0066CC',
                            fontSize: '16px',
                            textTransform: 'None',
                            fontWeight: 'bold'
                        }}
                    >
                        <Box sx={{ display: 'flex', alignItems: 'center' }}>
                            Food &nbsp; <FoodBankIcon color='primary' />
                        </Box>
                    </Button>
                    </Tooltip>
                    
                </div>
                <Tooltip title = 'Profile' placement = 'top-start'>
                    <Button
                    onClick={handleClick}
                    sx={{
                        fontFamily: `Montserrat`,
                        color: '#0066CC',
                        fontSize: '16px',
                        textTransform: 'None',
                        fontWeight: 'bold',
                        paddingRight: '1rem'
                    }}
                >
                    <Box sx={{ display: 'flex', alignItems: 'center' }}>
                            Profile &nbsp; <PersonIcon color='primary' />
                        </Box>
                </Button>
                </Tooltip>
                
                <Box />

            </Box>
        </div>
    );
}