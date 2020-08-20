import React, {useState } from "react";
import Drawer from '@material-ui/core/Drawer';
import Button from '@material-ui/core/Button';
import MenuIcon from '@material-ui/icons/Menu';
import Divider from '@material-ui/core/Divider';
import CallMissedOutgoingIcon from '@material-ui/icons/CallMissedOutgoing';
import { withRouter } from 'react-router-dom';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import clsx from 'clsx';
import IconButton from '@material-ui/core/IconButton';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import { styling } from '../../sidebarStyling';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import {login, editInfo} from '../../RoutesConstants';
import { Card, Spinner } from "react-bootstrap";
import { sidebarList } from "./sidebarList";
import AllFacilites from "../facility/render/AllFacilites";
import OneFacility from "../facility/render/OneFacility";
import CreateFacility from "../facility/add/CreateFacility";
import { logout } from "../../rest/restCallsUser";
import EditUserInfo from "../user/EditUserInfo";
import ViewMyReservations from "../reservations/ViewMyReservations";

const LoggedInHomepage = ({filtered,filterF,viewMyReservations,current_table,setCurrentTable,getLoggedInUser,isLoggedIn,editUser,user,history,OneF,AllF,NewF,facilites,facility,removeCurentFac,current_is_avaliable,getCurrent}) => {
    const [isOpen, setOpen] = useState(true);
    const handleDrawerOpen = () => { setOpen(true); };
    const handleDrawerClose = () => { setOpen(false); };
    const theme = useTheme();
    const useStyles = makeStyles((theme) => (styling(theme)));
    const classes = useStyles();
    console.log(AllF);

    if(user.role !== 'NONE'){
    return (
        <div className={classes.root}>
            <CssBaseline />
            <AppBar position="fixed" className={clsx(classes.appBar, { [classes.appBarShift]: isOpen })}>
                <Toolbar className={classes.toolbar}>
                    <IconButton color="inherit" onClick={handleDrawerOpen} edge="start" className={clsx(classes.menuButton, isOpen && classes.hide)}>
                        <MenuIcon style={{ color: 'black' }} />
                    </IconButton>
                    <div style={{ width: '100%' }}></div>
                    <Button><AccountCircleIcon fontSize="large" style={{ color: 'gray' }} onClick={() => { history.push(`${editInfo}`); }}/></Button>
                    <Button><CallMissedOutgoingIcon style={{ color: 'gray' }} onClick={() => { localStorage.clear(); logout(); history.push(`${login}`); }} fontSize="large" className={classes.logoutButton} /></Button>
                </Toolbar>
            </AppBar>
            <MenuIcon />
            <Drawer className={classes.drawer} variant="persistent" anchor="left" open={isOpen} classes={{ paper: classes.drawerPaper }}>
                <div className={classes.drawerHeader}>
                    <IconButton onClick={handleDrawerClose}>
                        {theme.direction === 'ltr' ? <ChevronLeftIcon /> : <ChevronRightIcon />}
                    </IconButton>
                </div>
                <Divider />
                {sidebarList(history,user.role)}
            </Drawer>
            <main className={clsx(classes.content, { [classes.contentShift]: isOpen })}>
                <div className={classes.drawerHeader} />
                { OneF === true &&
                    <OneFacility current_table={current_table} setCurrentTable={(table) => this.props.setCurrentTable(table)} getCurrent={(id) => getCurrent(id)}   user = {user} facility={facility} current_is_avaliable={current_is_avaliable} removeCurentFac={() => removeCurentFac()}/> 
                }{
                    AllF === true &&
                    <AllFacilites filtered={filtered} facilites={facilites.facilites} filterF={(facilites) => filterF(facilites)} />
                }{ NewF ===  true &&
                    <CreateFacility/> 
                }{  editUser === true && 
                    <EditUserInfo user={user} isLoggedIn={isLoggedIn} getLoggedInUser={() => getLoggedInUser()} />
                }{ viewMyReservations === true &&
                    <ViewMyReservations user={user} isLoggedIn={isLoggedIn}/>
                } 
            </main>
        </div>
    );
            } 
            
}
export default withRouter(LoggedInHomepage);


