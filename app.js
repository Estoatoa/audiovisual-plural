const $ = s => document.querySelector(s);
const groups = [
 ['Distribuição regional dos investimentos · 2025','%',[['Sudeste',66.3],['Nordeste',11.5],['Sul',11.1],['Centro-Oeste',8.5],['Norte',2.6]],'MinC. Participação regional divulgada para 2025. Etapa financeira não especificada.'],
 ['Reservas para vocacionadas · plano original de 2024','R$ milhões',[['Produção cinematográfica seletiva',40],['Comercialização seletiva',15],['Produção seletiva TV/VoD',40]],'ANCINE. Previsão original calculada em R$ 95 milhões. Revisões posteriores devem ser examinadas separadamente.'],
 ['Planos de ação · orçamento previsto','R$ bilhões',[['2024',1.21],['2026',1.4]],'ANCINE e MinC. Valores nominais dos planos, sem correção monetária.'],
 ['Remuneração média · 2025','R$',[['Audiovisual',6468],['Brasil',3783]],'Referência indicada: Anuário Estatístico do Audiovisual Brasileiro 2025. Consulte a ficha de verificação.'],
 ['Impacto econômico total · 2024','R$ bilhões',[['Impacto estimado',70.2]],'Estudo de contribuição econômica de 2024. Estimativa de impacto na economia.'],
 ['Empregos associados · 2024','empregos',[['Empregos associados',608970]],'Estudo de contribuição econômica de 2024. Empregos associados ao impacto estimado.'],
 ['Empregos formais · 2025','vínculos',[['Audiovisual',78434]],'Anuário Estatístico do Audiovisual Brasileiro 2025. Universo de emprego formal.'],
 ['Estabelecimentos empregadores · 2025','estabelecimentos',[['Audiovisual',4554]],'Anuário Estatístico do Audiovisual Brasileiro 2025. Estabelecimentos com empregados.']
];
function el(tag, str){const node=document.createElement(tag);node.textContent=str;return node}
groups.forEach(([name],i)=>$('#indicator').add(new Option(name,i)));
function draw(){const [title,unit,values,note]=groups[Number($('#indicator').value)],chart=$('#chart');chart.replaceChildren(el('h3',title));const max=Math.max(...values.map(v=>v[1]));values.forEach(([label,value])=>{const row=el('article',''),line=el('div',''),track=el('div',''),bar=el('i','');row.className='row';line.append(el('span',label),el('strong',unit.startsWith('R$') ? 'R$ '+value.toLocaleString('pt-BR')+unit.slice(2) : value.toLocaleString('pt-BR')+(unit==='%'?'%':' '+unit)));track.className='track';bar.style.width=(value/(unit==='%'?100:max)*100)+'%';track.append(bar);row.append(line,track);chart.append(row)});chart.append(el('p',note));
const urls = [
'https://www.gov.br/cultura/pt-br/assuntos/noticias/minc-aprova-plano-de-r-1-4-bilhao-para-o-audiovisual-e-avanca-na-reestruturacao-do-fsa/',
'https://www.gov.br/ancine/pt-br/assuntos/noticias/comite-gestor-do-fsa-aprova-plano-de-acao-2024/',
'https://www.gov.br/cultura/pt-br/assuntos/noticias/minc-aprova-plano-de-r-1-4-bilhao-para-o-audiovisual-e-avanca-na-reestruturacao-do-fsa/',
'https://www.gov.br/ancine/pt-br/assuntos/noticias/anuario-estatistico-do-audiovisual-brasileiro-2025',
'https://fica.org.br/wp-content/uploads/2026/01/A-CONTRIBUICAO-ECONOMICA-DA-INDUSTRIA-AUDIOVISUAL-NO-BRASIL-EM-2024.pdf'];
const refs=[[0],[1],[1,2],[3],[4],[4],[3],[3]][Number($('#indicator').value)];
for(const index of refs){const a=el('a',index===1?'Plano de 2024':index===2?'Plano de 2026':'Consultar fonte');a.href=urls[index];chart.append(a,' ')}}
$('#indicator').onchange=draw;draw();
for(const section of document.querySelectorAll('main section[id]')){let h=section.querySelector('h2,h1');if(!h)continue;let a=el('a',section.id==='inicio'?'Início':h.textContent);a.href='#'+section.id;a.onclick=()=>$('#menu').open=false;$('#sections').append(a)}
