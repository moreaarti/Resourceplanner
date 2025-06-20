import React from 'react';
import DOMPurify from 'dompurify';
import { Link } from 'react-router-dom';

const SanitizedContent = ({ htmlContent ,textCssClass,LinkUrl}) => {

  let sanitizedHTML = '';
  // Sanitize the HTML content to prevent XSS attacks
  // const sanitizedHTML = DOMPurify?.sanitize( htmlContent ? htmlContent?.replaceAll("<p></p>","<br/>") :"");

  if (typeof htmlContent === 'string') {
    sanitizedHTML = DOMPurify.sanitize(htmlContent.replaceAll("<p></p>", "<br/>"));
  } else {
    sanitizedHTML= htmlContent
    // console.warn('htmlContent is not a string:', htmlContent);
    // Handle the case where htmlContent is not a string as needed
    // For example, render a fallback UI or log an error
  }

  return (
    <Link to={ LinkUrl && LinkUrl }>
    <div  className={` reactquillcss1  ${ textCssClass ? ` ${textCssClass} ` :` cursor-text text-base leading-6 font-normal `} `} dangerouslySetInnerHTML={{ __html: sanitizedHTML }} />
    </Link>
  );
};

export default SanitizedContent;
