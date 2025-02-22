		// read CSV file
    var projectData = [];
    var xmlhttp = new XMLHttpRequest();
    xmlhttp.onreadystatechange = function() {
      if (this.readyState == 4 && this.status == 200) {
      var lines = this.responseText.split(/\r?\n/);
      
      for (var i = 1; i < lines.length; i++) {
        var fields = lines[i].split(";");
        // console.log(fields.length)
        // console.log(fields[0])
        if (fields.length >= 8) {
        projectData.push({
          name: fields[0],
          image: fields[1],
          github_label: fields[2],
          github: fields[3],
          proj_page: fields[4],
          people: fields[5],
          location: fields[6],
          abstract: fields[7]
        });
        }
      }
    
      // create HTML elements
      const mainContainer = document.querySelector(".mainContent");
      var section2_one = document.createElement("section");
        section2_one.className = "section2";
        section2_one.setAttribute('id', 'firstPage');
      mainContainer.appendChild(section2_one);
    
      var section2_two = document.createElement("section");
        section2_two.className = "section2";
        section2_two.setAttribute('id', 'secondPage');
      mainContainer.appendChild(section2_two);
    
      var numProj_page1 = 6;
    
    
      
      function populate(start,pageLength,thisProjectContainer){
      
        let projectContainer;
        let viewMoreButton;
        if(thisProjectContainer==0){
          projectContainer = document.querySelector(".section2#firstPage");
          viewMoreButton = document.createElement("ul");
            viewMoreButton.className = "buttons";
            viewMoreButton.id = "viewMore"
            var li = document.createElement("li")
            var buttonText = document.createElement("a");
              buttonText.textContent = "view more";
              buttonText.className = "button n01";
              li.appendChild(buttonText);
            viewMoreButton.appendChild(li);
      
        }else{
          projectContainer = document.querySelector(".section2#secondPage");
          viewMoreButton = document.createElement("ul");
            viewMoreButton.className = "buttons";
            viewMoreButton.id = "backButton"
            var li = document.createElement("li")
            var buttonText = document.createElement("a");
              buttonText.textContent = "back";
              buttonText.className = "button n01";
              li.appendChild(buttonText);
          viewMoreButton.appendChild(li);
        }
      
          var overall_title = document.createElement("h2");
            overall_title.textContent = "Projects";
            overall_title.className = "sectionTitle";
          var hr = document.createElement("hr");
      
          projectContainer.appendChild(overall_title);
          projectContainer.appendChild(hr);
        
          for (var i = start; i < pageLength; i++) {
            var project = projectData[i];
      
            var sectionContenDiv = document.createElement("div");
              sectionContenDiv.className = "sectionContent";
              var img = document.createElement("img");
                img.src = project.image;
                img.style = "height: 100%; width: 100%; object-fit: contain"
                img.className = "projectImg"
      
            var section2Content = document.createElement("section");
            section2Content.className = "section2Content";
              var title = document.createElement("h2");
                title.className = "sectionContentTitle";
              var link = document.createElement("a");
                link.href = project.proj_page;
                link.textContent = project.name;
                title.appendChild(link);
      
            var subTitle1 = document.createElement("h3");
            subTitle1.className = "sectionContentSubTitle";
            var subTitle2 = document.createElement("h3");
            subTitle2.className = "sectionContentSubTitle";
              if (project.people === undefined || project.people === null || project.people === '') {
              subTitle1.innerHTML = "<b>&nbsp;</b>";
              }else{
                subTitle1.innerHTML = "<b> Rohan Gangakhedkar </b>";
                var people_fields = project.people.split(",");
                for(var j =0; j<people_fields.length;j+=2){
                  subTitle1.innerHTML = subTitle1.innerHTML + ", " + "<a href=\" "+ people_fields[j+1] +" \" target=\"_blank\">" + people_fields[j] + "</a>"
                }
              }
              subTitle2.innerHTML = "<em>" + project.location + "</em>";
      
            var aside = document.createElement("aside");
              aside.className = "externalResourcesNav"
              var div1 = document.createElement("div");
              div1.className = "dropdown";
              div1.style.marginRight = "8px";
              div1.innerHTML = "<span></span><a href=\"" + project.proj_page + "\" target=\"_blank\">Project Page</a>";
      
            var div2 = document.createElement("div");
              var p = document.createElement("p");
              div2.className = "dropdown";
              div2.style.marginRight = "8px";
              div2.innerHTML = "<span>Abstract</span><div class=\"dropdown-content\"><p style=\"text-align:left;\">" + project.abstract + "</p></div>";
      
            var div3 = document.createElement("div");
              div3.className = "dropdown";
              div3.innerHTML = "<span></span><a href=\"" + project.github + "\" target=\"_blank\">"+ project.github_label +"</a>";
      
      
            var rowBreak = document.createElement("br")
            var rowBreak2 = document.createElement("br")
            var rowBreak3 = document.createElement("br")
      
            sectionContenDiv.appendChild(img)
            section2Content.appendChild(title)
            section2Content.appendChild(subTitle1);
            section2Content.appendChild(subTitle2);
            aside.appendChild(div1);
            aside.appendChild(div2);
            aside.appendChild(div3);
      
            
            projectContainer.appendChild(sectionContenDiv);
            projectContainer.appendChild(section2Content);
            projectContainer.appendChild(aside);
            projectContainer.appendChild(rowBreak);
            projectContainer.appendChild(rowBreak2);
            projectContainer.appendChild(rowBreak3);
          }
      
        projectContainer.appendChild(viewMoreButton);
        projectContainer.appendChild(document.createElement("hr"));
      }
      var firstPageLength = (projectData.length>numProj_page1) ? numProj_page1 : projectData.length;
      populate(0,firstPageLength,0);
    
        var secondPageLength = (firstPageLength==numProj_page1) ? projectData.length-numProj_page1 : 0;
        populate(firstPageLength,firstPageLength+secondPageLength,1);
      }
    };
    xmlhttp.open("GET", "main_landing/js/projects.csv", true);
    xmlhttp.send();