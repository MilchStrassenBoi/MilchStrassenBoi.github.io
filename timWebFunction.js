
var sprache = localStorage.getItem('sprache') || "de";

function setSprache() {
    localStorage.setItem('sprache', event.target.value); 
    location.reload();
 
}

const xhr = new XMLHttpRequest();

xhr.open('GET', 'data/textData.json');

xhr.onload = function() {
  if(xhr.status === 200) {
      
    const response = JSON.parse(xhr.responseText);
    const main = document.querySelector('main');

    var textItems 
    
    if(sprache == "de"){
        textItems = response.textDE;  
    }else{
        textItems = response.textEN;  
       }
    //Navi erstellen
      
    const moveDiv = document.getElementById('moveDiv');
    const table = document.createElement('table');
    table.id = 'navi';
      
    let titleCounter = 0;  
      textItems.forEach(function(item) {
            const row = document.createElement('tr');
            const cell = document.createElement('td');
            cell.className = 'menu';

            const link = document.createElement('a');
            link.className = 'menulink';
            link.textContent = item.titel;
            link.setAttribute('data-title-counter', titleCounter);
          
          // Add a click event listener to the link
            link.addEventListener('click', function() {
                
                const titleCounterValue = parseInt(this.getAttribute('data-title-counter'));
                jumpToSection("section" + titleCounterValue); // Call jumpToSection with the value you want to pass
                
            });
          titleCounter++;
          //console.log(titleCounter);

          cell.appendChild(link);
          row.appendChild(cell);
          table.appendChild(row);

      });
      
      moveDiv.appendChild(table);
      main.appendChild(moveDiv);
      
      let sectionCount = 0;
      
    //Inhalt füllen
    textItems.forEach(function(item) {
        
        
    
      const section = document.createElement('section');
        section.id = 'section' + sectionCount;
        //console.log("created section-" + sectionCount);
        //console.log(section.id);
        sectionCount++;
        
        //TITLE///
      const title = document.createElement('div');
        title.classList.add('Title');
        
    const imageWrapper = document.createElement('div');
        imageWrapper.classList.add('image-wrapper');

        const image = document.createElement('img');
        image.src = 'img/SchafTitle.png';
        image.alt = 'Image';
        image.className  = 'titleImg';
 
        imageWrapper.appendChild(image);
        
        title.appendChild(imageWrapper);
        
        const text = document.createElement('div');
        text.className = 'image-text';  
        text.textContent = item.titel;
        title.appendChild(text);

      section.appendChild(title);
        
///
        
      if (item.content) {
        item.content.forEach(function(content) {
            const contentDiv = document.createElement('div');
                contentDiv.classList.add('Context');
          if (content.header) {
            const header = document.createElement('h2');
            header.textContent = content.header;
            contentDiv.appendChild(header);
          }
            
          if (content.sliderPNG && content.sliderPNG.length > 0) {
              
            const sliderContainer = document.createElement("div");
              
                if(content.sliderPNG.length == 1){
                    sliderContainer.classList.add("single-slider-container");
                }else{
                    sliderContainer.classList.add("slider-container");
                }
           

            content.sliderPNG.forEach(function(image_url) {
              const sliderItem = document.createElement("div");
              sliderItem.classList.add("slider-item");

              const img = document.createElement("img");
              img.src = image_url;
              img.alt = "";

              sliderItem.appendChild(img);
              sliderContainer.appendChild(sliderItem);
            });

            contentDiv.appendChild(sliderContainer);
          }
            
          if (content.videoSource) {
            const video = document.createElement('video');
            video.controls = true;
            video.classList.add('videosource');
    
            const source = document.createElement('source');
            source.src = content.videoSource;
            source.type = 'video/mp4';
            video.appendChild(source);
    
            contentDiv.appendChild(video);
          }
          
        if (content.videoLinkSource) {
            const contentVideoSource = content.videoLinkSource;

            const iframe = document.createElement('iframe');
            iframe.classList.add('videosource');
            iframe.src = contentVideoSource;
            iframe.title = 'YouTube video player';
            iframe.frameBorder = '0';
            iframe.allow = 'accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share';
            iframe.referrerPolicy = 'strict-origin-when-cross-origin';
            iframe.allowFullscreen = true;
            
            contentDiv.appendChild(iframe);


            }
            
          if (content.audioSource) {
            const audio = document.createElement('audio');
            audio.controls = true;
            audio.classList.add('audiosource');
    
            const source = document.createElement('source');
            source.src = content.audioSource;
            source.type = 'audio/mpeg';
            audio.appendChild(source);
    
            contentDiv.appendChild(audio);
          }
          const text = document.createElement('p');
          text.innerHTML = content.text;
          text.classList.add('paragrahText');
          const paraDiv = document.createElement('div');
          paraDiv.classList.add('paraDivClass');
          paraDiv.appendChild(text);
          contentDiv.appendChild(paraDiv);
          section.appendChild(contentDiv);
        });
      }
      main.appendChild(section);
    });
      
  }
}

xhr.send();


///Methods for the Websitde

function jumpToSection(sectionId){
    
    //console.log("hello:" + sectionId);
   var section = document.getElementById(sectionId);
    section.scrollIntoView({ behavior: 'smooth' });
    
}


/*
const slider = document.querySelector('.slider');
    const prevBtn = document.querySelector('.prev-btn');
    const nextBtn = document.querySelector('.next-btn');

    let translateX = 0;

    prevBtn.addEventListener('click', () => {
      if (translateX === 0) {
        translateX = -(slider.offsetWidth * (slider.childElementCount - 1));
      } else {
        translateX += slider.offsetWidth;
      }
      slider.style.transform = `translateX(${translateX}px)`;
    });

    nextBtn.addEventListener('click', () => {
      if (translateX === -(slider.offsetWidth * (slider.childElementCount - 1))) {
        translateX = 0;
      } else {
        translateX -= slider.offsetWidth;
      }
      slider.style.transform = `translateX(${translateX}px)`;
    });
*/