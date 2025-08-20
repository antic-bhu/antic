fetch('/committee_workshop.json')
  .then(res => res.json())
  .then(data => {
    const desktopContainer = document.querySelector('#committee .row');
    const mobileContainer = document.querySelector('#committee-mob .row');

    data.committees.forEach((committee, index) => {
      const sectionDiv = document.createElement('div');
      sectionDiv.className = 'col-lg-12';
      sectionDiv.style.paddingBottom = '10px';

      const title = document.createElement('h2');
      title.style.cssText = 'color: #000d16; font-size:30px;';
      title.textContent = committee.committeeTitle;
      sectionDiv.appendChild(title);

      const row = document.createElement('div');
      row.className = 'row';
      row.style.alignItems = 'center';
      let wrapper1, wrapper2;

      const memberCount = committee.members.length;
      let colClass = 'col-md-4 col-lg-3';

      if (memberCount === 1) colClass = 'col-md-12 col-lg-12';
      else if (memberCount === 2) colClass = 'col-md-6 col-lg-6';
      else if (memberCount === 3) colClass = 'col-md-6 col-lg-4';

      if (committee.view === 4) {
        wrapper2 = document.createElement('div');
        wrapper2.className = 'col-lg-12';
        wrapper2.style.paddingBottom = '10px';

        const title = document.createElement('h2');
        title.style.cssText = 'color: #000d16; font-size:30px; text-align: center;';
        title.textContent = committee.committeeTitle;
        wrapper2.appendChild(title);

        const infoRow = document.createElement('div');
        infoRow.className = 'row justify-content-center';
        infoRow.style.textAlign = 'center';

        committee.members.forEach(member => {
          const col = document.createElement('div');
          col.className = 'col-md-4 col-lg-3';
          col.style.marginBottom = '20px';

          const card = document.createElement('div');
          card.style.border = '1px solid #ddd';
          card.style.borderRadius = '8px';
          card.style.overflow = 'hidden';
          card.style.boxShadow = '0 2px 5px rgba(0,0,0,0.1)';
          card.style.background = '#fff';

          // Title bar
          const titleBar = document.createElement('div');
          titleBar.style.backgroundColor = '#3ba3b5'; // or use a color from committee.titleColor if available
          titleBar.style.padding = '10px';
          titleBar.style.textAlign = 'center';

          const name = document.createElement('h5');
          name.textContent = member.name;
          name.style.margin = 0;
          name.style.fontWeight = 'bold';
          name.style.color = '#fff';
          name.style.fontSize = '16px';

          titleBar.appendChild(name);
          card.appendChild(titleBar);

          // Body
          const body = document.createElement('div');
          body.style.padding = '10px';

          if (member.designation) {
            const designation = document.createElement('p');
            designation.style.margin = '0';
            designation.style.fontSize = '13px';
            designation.style.color = '#555';
            designation.textContent = member.designation;
            body.appendChild(designation);
          }

          if (member.affiliation) {
            const affiliation = document.createElement('p');
            affiliation.style.margin = '0';
            affiliation.style.fontSize = '13px';
            affiliation.style.color = '#000';
            affiliation.textContent = member.affiliation;
            body.appendChild(affiliation);
          }

          card.appendChild(body);
          col.appendChild(card);
          infoRow.appendChild(col);
        });

        wrapper2.appendChild(infoRow);
      }
      else {
        committee.members.forEach(member => {
          const col = document.createElement('div');
          col.className = colClass;
          col.style.paddingBottom = '10px';

          const container = document.createElement('div');
          container.className = 'main-container';

          const posterContainer = document.createElement('div');
          posterContainer.className = 'poster-container';

          const img = document.createElement('img');
          img.className = 'poster';
          img.style.height = '180px';
          img.src = member.photo || '/static/img/person.png';
          posterContainer.appendChild(img);

          const ticketContainer = document.createElement('div');
          ticketContainer.className = 'ticket-container';

          const content = document.createElement('div');
          content.className = 'ticket__content';

          const name = document.createElement('h4');
          name.className = 'ticket__movie-title';
          name.textContent = member.name;

          const button = document.createElement('button');
          button.className = 'ticket__buy-btn';
          button.innerHTML = `${member.designation || ''}<br>${member.affiliation || ''}`;

          content.appendChild(name);
          content.appendChild(button);
          ticketContainer.appendChild(content);

          container.appendChild(posterContainer);
          container.appendChild(ticketContainer);
          col.appendChild(container);
          row.appendChild(col);
        });

        if (committee.view === 3) {
          wrapper1 = document.createElement('div');
          wrapper1.className = 'col-lg-12';

          const footer = document.createElement('footer');
          footer.id = 'footer';
          footer.style.cssText = 'margin-top: 5px; background: transparent; width: 1125px;';

          const footerTop = document.createElement('div');
          footerTop.className = 'footer-top';
          footerTop.style.background = '#3ba3b5';

          const containerDiv = document.createElement('div');
          containerDiv.className = 'container';

          const rowDiv = document.createElement('div');
          rowDiv.className = 'row';

          const innerCol = document.createElement('div');
          innerCol.className = 'col-lg-12 col-md-6 footer-links';

          const heading = document.createElement('h4');
          heading.style.cssText = 'text-align: center; border-bottom: 2px solid #000d16;';
          heading.textContent = committee.committeeTitle;

          const memberRow = document.createElement('div');
          memberRow.className = 'row';

          committee.members.forEach(member => {
            const col = document.createElement('div');
            col.className = 'col-lg-2';
            col.style.paddingBottom = '10px';

            const nameP = document.createElement('p');
            nameP.style.cssText = 'font-size: 11px; color: #fff;';
            nameP.textContent = member.name;

            const affP = document.createElement('p');
            affP.style.cssText = 'font-size: 08px; color: #000d16;';
            affP.textContent = member.affiliation;

            col.appendChild(nameP);
            col.appendChild(affP);
            memberRow.appendChild(col);
          });

          innerCol.appendChild(heading);
          innerCol.appendChild(memberRow);
          rowDiv.appendChild(innerCol);
          containerDiv.appendChild(rowDiv);
          footerTop.appendChild(containerDiv);
          footer.appendChild(footerTop);
          wrapper1.appendChild(footer);
        }
      }

      if (committee.view === 3 && wrapper1) {
        desktopContainer.appendChild(wrapper1);
      } else if (committee.view === 4 && wrapper2) {
        desktopContainer.appendChild(wrapper2);
      } else {
        sectionDiv.appendChild(row);
        desktopContainer.appendChild(sectionDiv);
      }

      // === MOBILE VIEW ===
      const dropdownDiv = document.createElement('div');
      dropdownDiv.className = (index % 2 === 0) ? 'dropdown4' : 'dropdown2';

      const button = document.createElement('button');
      button.className = dropdownDiv.className.replace('dropdown', 'dropbtn');

      const h2 = document.createElement('h2');
      h2.style.fontSize = '14px';
      h2.style.color = index % 2 === 0 ? '#000d16' : '#3ba3b5';
      h2.textContent = committee.committeeTitle;
      button.appendChild(h2);

      const content = document.createElement('div');
      content.className = dropdownDiv.className.replace('dropdown', 'dropdown-content');

      committee.members.forEach(member => {
        const name = document.createElement('a');
        name.style.fontSize = '12px';
        name.style.color = '#fff';
        name.textContent = member.name;

        if (member.photo) {
          name.setAttribute('tabindex', '0');
          name.setAttribute('data-toggle', 'popover');
          name.setAttribute('data-trigger', 'hover focus');
          name.setAttribute('data-html', 'true');
          name.setAttribute('data-content', `<img src="${member.photo}" style="width:100px;height:auto;">`);
          name.setAttribute('data-placement', 'right');
        }

        content.appendChild(name);

        if (member.designation || member.affiliation) {
          const info = document.createElement('a');
          info.style.fontSize = '10px';
          info.style.color = index % 2 === 0 ? '#000d16' : '#3ba3b5';

          if (member.designation && member.affiliation) {
            info.innerHTML = `${member.designation}<br>${member.affiliation}`;
          } else if (member.designation) {
            info.textContent = member.designation;
          } else {
            info.textContent = member.affiliation;
          }

          content.appendChild(info);
        }
      });

      dropdownDiv.appendChild(button);
      dropdownDiv.appendChild(content);

      const mobileWrapper = document.createElement('div');
      mobileWrapper.className = 'col-lg-12';
      mobileWrapper.style.alignItems = 'center';
      mobileWrapper.appendChild(dropdownDiv);

      mobileContainer.appendChild(mobileWrapper);
    });

    // Initialize popovers
    $(function () {
      $('[data-toggle="popover"]').popover();
    });
  })
  .catch(err => {
    console.error('Failed to load committee JSON:', err);
  });
