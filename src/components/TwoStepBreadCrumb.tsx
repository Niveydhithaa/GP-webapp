import * as React from 'react';
import Typography from '@mui/material/Typography';
import Breadcrumbs from '@mui/material/Breadcrumbs';
import Link from '@mui/material/Link';
import {useNavigate} from "react-router-dom"



export default function BasicBreadcrumbs() {
    const navigate = useNavigate();
    function handleClick(event: React.MouseEvent<HTMLAnchorElement, MouseEvent> |React.MouseEvent<HTMLSpanElement, MouseEvent> , url: string) {
        event.preventDefault();
        console.info('You clicked a breadcrumb.');
        localStorage.setItem("tabIndex", "0")
        navigate("/" + url)
      }
  return (
    <div role="presentation">
      <Breadcrumbs aria-label="breadcrumb">
        <Link underline="hover" color="inherit" onClick={(e) => handleClick(e, "home")}>
          NICE Guidelines Search
        </Link>
        <Typography color="Highlight">Patients List </Typography>
      </Breadcrumbs>
    </div>
  );
}