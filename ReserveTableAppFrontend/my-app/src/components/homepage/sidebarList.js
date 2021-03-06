import React from 'react';
import Divider from '@material-ui/core/Divider';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import AddCircleIcon from '@material-ui/icons/AddCircle';
import PlaylistAddIcon from '@material-ui/icons/PlaylistAdd';
import {facilites,newfacility, reservations} from '../../RoutesConstants';
import cutlery from '../../icons/cutlery.svg';
import pen from '../../icons/add.svg';
import bell from '../../icons/reserved.svg'

export function sidebarList(history,role) {
    return (
        <List>
            {role === 'ADMIN' &&
                <div style={{color:'black'}}>
                    <ListItem button onClick={() => { history.push(`${facilites}`) }}>
                        <img alt="icon" src={cutlery} style={{height:'25px',width:'25px',marginRight:'2%'}}/>
                        <ListItemText primary="Caffes/Restaurants" />
                    </ListItem>

                    <Divider />
                    <ListItem button onClick={() => { history.push(`${newfacility}`) }}>
                    <img alt="icon" src={pen} style={{height:'25px',width:'25px',marginRight:'2%'}}/>
                        <ListItemText primary="Add cafe/restaurant" />
                    </ListItem>

                    <Divider />
                </div>
            }
            {role === 'CUSTOMER' &&
                <div>
                    <ListItem button onClick={() => { history.push(`${facilites}`) }}>
                        <img alt="icon" src={cutlery} style={{height:'25px',width:'25px',marginRight:'2%'}}/>
                        <ListItemText primary="Caffes/Restaurants" />
                    </ListItem>
                    <ListItem button onClick={() => { history.push(`${reservations}`) }}>
                        <img alt="icon" src={bell} style={{height:'25px',width:'25px',marginRight:'2%'}}/>
                        <ListItemText primary="Reservations" />
                    </ListItem>
                </div>

            }

            <Divider />
        </List>
    );
};
