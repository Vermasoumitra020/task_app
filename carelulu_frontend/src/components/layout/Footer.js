import React from 'react';
import classes from './style/Footer.module.css'
import FooterLogo from "../ui/FooterLogo";
import {Button, Grid} from "@mui/material";

const footerInfo = {
    "FOR PARENTS": {
        "Parent Resources": "www.carelulu.com/resources/parents",
        "How It Works": "www.carelulu.com/how-it-works",
        "Testimonials": "www.carelulu.com/testimonials",
        "Terms of Use": "www.carelulu.com/terms-of-use",
        "Privacy Policy": "www.carelulu.com/privacy-policy"
    },
    "FOR PROVIDERS": {
        "Provider Resources": "www.carelulu.com/resources/childcare-providers",
        "How It Works": "www.carelulu.com/get-started",
        "Testimonials": "www.carelulu.com/provider-testimonials",
        "Terms and Conditions": "www.carelulu.com/terms-for-providers",
        "List Your Program": "www.carelulu.com/register"
    },
    "MORE": {
        "About Us": "www.carelulu.com/about-us",
        "Press": "www.carelulu.com/press",
        "Jobs": "www.carelulu.com/jobs",
        "Contact Us": "www.carelulu.com/contact-us"
    }
}

const socialInfo =[
    ['/images/fb_icon.png', 'www.facebook.com/carelulu'],
    ['/images/twitter_icon.png', 'www.twitter.com/mycarelulu'],
    ['/images/insta_icon.png', 'instagram.com/mycarelulu']
]

function Footer(props) {
    return (
        <div className={classes.footer}>
            <Grid container
                  spacing={1}
                  direction={'row'}
                  justifyContent={'center'}
                  alignItems={'top'}
                  sx={{
                      padding: '1rem 10rem',

                  }}
            >
                <Grid continer item xs={3}>
                    <Grid item xs={12}>
                        <div><FooterLogo /></div>
                    </Grid>
                </Grid>

                <Grid container item xs={6}>
                    {Object.keys(footerInfo).map(key => (
                        <Grid item xs={4}>
                            <div>
                                <div style={{color:'white'}}>
                                    <h4>{key}</h4>
                                    {Object.keys(footerInfo[key]).map(topic => (
                                        <div className={classes.footerInfo}>
                                            <a href={footerInfo[key][topic]}>{topic}</a><br/>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </Grid>
                    ))}
                </Grid>

                <Grid container item xs={3}
                      columnSpacing={5}
                      rowSpacing={0}
                      direction={'row'}
                      justifyContent={'center'}
                      alignItems={'top'}
                      sx={{
                          marginTop: '2rem',
                          marginBottom: '2rem',
                          padding: '1rem 7rem 0 7rem',
                          // border: '1px solid black'
                      }}
                >
                    {socialInfo.map(info => (
                        <Grid item xs={4} >
                            <a href={info[1]}><img src={info[0]} height={'50rem'}/></a>
                        </Grid>
                    ))}

                    <Grid item xs={12} >
                        <a href="https://carelulu.zendesk.com/hc/en-us"><Button className={classes.footerButton}>Help Center</Button></a>
                    </Grid>
                </Grid>
            </Grid>
        </div>
    );
}

export default Footer;
