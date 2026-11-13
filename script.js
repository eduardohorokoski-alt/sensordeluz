const menu=document.getElementById('menuToggle'),nav=document.getElementById('navlinks');
    menu.addEventListener('click',()=>{const open=menu.getAttribute('aria-expanded')!=='true';menu.setAttribute('aria-expanded',String(open));nav.classList.toggle('open',open)});
    nav.addEventListener('click',e=>{if(e.target.closest('a')){nav.classList.remove('open');menu.setAttribute('aria-expanded','false')}});
    document.getElementById('contrastBtn').addEventListener('click',e=>{const on=document.body.classList.toggle('contrast');e.currentTarget.setAttribute('aria-pressed',String(on))});
    document.getElementById('dyslexiaBtn').addEventListener('click',e=>{const on=document.body.classList.toggle('dyslexia');e.currentTarget.setAttribute('aria-pressed',String(on))});
    const time=document.getElementById('timeRange'),tilt=document.getElementById('tiltRange');
    const timeOut=document.getElementById('timeOut'),tiltOut=document.getElementById('tiltOut'),result=document.getElementById('simResult');
    const clamp=(x,a,b)=>Math.max(a,Math.min(b,x));
    function update(){
      const h=Number(time.value),a=Number(tilt.value),sunAngle=clamp(90-Math.abs(12-h)*9,18,88);
      const horizontal=Math.round(25+75*Math.sin(sunAngle*Math.PI/180));
      const panelAngle=clamp(90-Math.abs(sunAngle-a),12,90);
      const inclined=Math.round(25+75*Math.sin(panelAngle*Math.PI/180));
      timeOut.value=String(h).padStart(2,'0')+':00';timeOut.textContent=timeOut.value;tiltOut.value=a+'°';tiltOut.textContent=a+'°';
      document.getElementById('barA').style.width=horizontal+'%';document.getElementById('barB').style.width=inclined+'%';
      document.getElementById('valA').textContent=horizontal+'%';document.getElementById('valB').textContent=inclined+'%';
      document.getElementById('tiltedPanel').style.transform=`skewY(-8deg) rotate(${-Math.max(0,a-30)/5}deg)`;
      document.getElementById('sunIcon').style.right=(10+(16-h)*4)+'%';document.getElementById('ray').style.transform=`rotate(${25+(h-8)*5}deg)`;
      document.getElementById('readout').textContent=`${timeOut.value} · comparação estimada`;
      const winner=inclined>horizontal?'superfície inclinada':'superfície horizontal';
      result.innerHTML=`<p>Neste modelo didático, a leitura relativa maior é da <strong>${winner}</strong>.</p><p>Horizontal: ${horizontal} · Inclinado (${a}°): ${inclined}</p>`;
      const x=48+(h-8)/8*522,y=170-(horizontal/100)*135;
      document.getElementById('chartDot').setAttribute('cx',x);document.getElementById('chartDot').setAttribute('cy',y);
      const peakY=35+(Math.abs(a-30)*.3);document.getElementById('chartLine').setAttribute('d',`M48 170 Q309 ${peakY} 570 170`);document.getElementById('chartArea').setAttribute('d',`M48 170 Q309 ${peakY} 570 170 L570 170 L48 170Z`);
      document.getElementById('chartDesc').textContent=`Curva didática de intensidade relativa com pico perto do meio-dia. Para ${timeOut.value} e inclinação de ${a} graus, o simulador estima horizontal ${horizontal} por cento e inclinado ${inclined} por cento.`;
    }
    time.addEventListener('input',update);tilt.addEventListener('input',update);update();
    window.addEventListener('load',()=>{if(window.VLibras) new window.VLibras.Widget('https://vlibras.gov.br/app')});
