$ = jQuery;

// Add fully automatic breadcrumb navigation
document.addEventListener('DOMContentLoaded', function() {

  // Capitalize the first letter of each word
  // function capitalizeWords(str) {
  //   return str.split(' ').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ');
  // }

  function capitalizeWords(str) {
  const umlautMap = {
    ae: 'ä',
    oe: 'ö',
    ue: 'ü',
    Ae: 'Ä',
    Oe: 'Ö',
    Ue: 'Ü'
  };

  // Replace ae/oe/ue with umlauts
  const withUmlauts = str.replace(/\b\w+\b/g, word => {
    return word.replace(/Ae|ae|Oe|oe|Ue|ue/g, match => umlautMap[match] || match);
  });

  // Capitalize each word
  return withUmlauts
    .split(' ')
    .map(word => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ');
}

  // Prevent duplicate breadcrumbs by checking if they already exist
  // const breadcrumbContainer = document.querySelector('.breadcrumb-container');
  let breadcrumbContainer = $('[data-breadcrumb="container"]');

  // repeat function for every selector
  breadcrumbContainer.each(function () {

    let breadcrumbHometext = $(this).attr("data-breadcrumb-hometext") || "Home";

    // if (breadcrumbContainer && !breadcrumbContainer.innerHTML) { // Proceed only if the container is empty
  
      // empty container content
       $(this).empty();
  
      // Get the current page URL segments
      const currentURL = window.location.pathname.split('/').filter(n => n);
  
      if (currentURL.length > 0) {
        let breadcrumbHTML = '<a class="breadcrumb-link breadcrumb-home" href="/">' + breadcrumbHometext + '</a>'; // Start with Home link
  
        // Loop through all but the last URL segment to avoid duplication
        currentURL.forEach((segment, index) => {
          if (index !== currentURL.length - 1) {
            const href = '/' + currentURL.slice(0, index + 1).join('/');
            const name = capitalizeWords(segment.replace(/-/g, ' ')); // Capitalize words and replace dashes
            breadcrumbHTML += ` <span class="breadcrumb-separator">&gt;</span> <a class="breadcrumb-link" href="${href}">${name}</a>`;
          }
        });
  
        // Add the last segment as plain text (current page) without a link
        const lastSegment = capitalizeWords(currentURL[currentURL.length - 1].replace(/-/g, ' '));
        breadcrumbHTML += ` <span class="breadcrumb-separator">&gt;</span> <span class="breadcrumb-current">${lastSegment}</span>`;
        
        // Insert the generated breadcrumb HTML into the container
        this.innerHTML = breadcrumbHTML;
      }
    // }
    
  });

});
  
document.addEventListener('DOMContentLoaded', function() {

  // Function to capitalize words
  function capitalizeWords(str) {
    return str.split(' ').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ');
  }

  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": []
  };

  // Add Home link
  breadcrumbSchema.itemListElement.push({
    "@type": "ListItem",
    "position": 1,
    "name": breadcrumbHometext,
    "item": window.location.origin // Reference home URL directly
  });

  // Get the current URL segments
  const currentURL = window.location.pathname.split('/').filter(n => n);

  // Loop through URL segments and build schema for each one
  currentURL.forEach((segment, index) => {
    const url = window.location.origin + '/' + currentURL.slice(0, index + 1).join('/');
    breadcrumbSchema.itemListElement.push({
      "@type": "ListItem",
      "position": index + 2, // Set the position correctly
      "name": capitalizeWords(segment.replace(/-/g, ' ')), // Capitalize the segment
      "item": url // Directly assign the URL
    });
  });

  // Append the schema as a script tag in the head
  const script = document.createElement('script');
  script.type = 'application/ld+json';
  script.textContent = JSON.stringify(breadcrumbSchema);
  document.head.appendChild(script);
});