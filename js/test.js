
    function calc3(a1,b1,c1,d1,
                   a2,b2,c2,d2,
                   a3,b3,c3,d3){

      var delta = (a1*b2*c3)+(b1*c2*a3)+(c1*a2*b3)-(c1*b2*a3)-(a1*c2*b3)-(b1*a2*c3)

      var xnum = (d1*b2*c3)+(b1*c2*d3)+(c1*d2*b3)-(c1*b2*d3)-(d1*c2*b3)-(b1*d2*c3)
      var x=xnum/delta

      var ynum = (a1*d2*c3)+(d1*c2*a3)+(c1*a2*d3)-(c1*d2*a3)-(a1*c2*d3)-(d1*a2*c3)
      var y=ynum/delta

      var znum = (a1*b2*d3)+(b1*d2*a3)+(d1*a2*b3)-(d1*b2*a3)-(a1*d2*b3)-(b1*a2*d3)
      var z=znum/delta

      return [Math.max(0,(x*100).toFixed(1)),
              Math.max(0,(y*100).toFixed(1)),
              Math.max(0,(z*100).toFixed(1))
             ]
    } //calc3

    function common(t){
      tbholdE.style.backgroundColor=''

      var tb=$('TGrades')
      moveEdit(null,tb.rows[tb.rows.length-1].cells[0],true)
//      moveEdit(null,tbholdE.nextSibling,true)
//      tbholdE=null

      var tr=$('TGrades').rows //getElementsByTagName('TR')
      if(t.checked) {
        for(var i=1;i<tr.length;i++) {
          if(innerText(tr[i].cells[0])=='') {
            tr[i].cells[0].innerHTML=t.value
            tr[i].style.background='white'
            break
          }
        }
        if(i==tr.length-1) addRow(['','']).style.background='#eee'
      }
      else {
        tbholdE=null
        for(var i=1;i<tr.length;i++) {
          if(innerText(tr[i].cells[0]).trim()==t.value.trim()) {
            $('TGrades').deleteRow(i)
            break
          }
        }
        if(i==tr.length-1) addRow(['','']).style.background='#eee'
      }
      cell1()
      calc()
    } //common

    function SShow(id, t){
      $$('#CalcArea button').css('background', '');
      $$(t).css('background', 'lightgreen');
      $$('#SRectangle, #SCircle, #SOval, #SHalfOval, #STriangle').hide();
      $$('#'+id).show();
    } //SShow

   function CalcRectArea() {
     var a=$t('RectLength')*$t('RectWidth')
     $('IArea').value=$('RArea').innerHTML=isNaN(a)?'-':Math.round(a*100)/100
     calc()
   }

   function CalcTriArea() {
     var a=$t('TriA')
     var b=$t('TriB')
     var c=$t('TriC')
     if(a>0 && b>0 && c>0) {
       var l=(a*a-b*b+c*c)/(2*c)
       var h=Math.sqrt(a*a-l*l)
       var a=0.5*c*h
       $('IArea').value=$('TArea').innerHTML=isNaN(a)?'-':Math.round(a*100)/100
       $('TriError').innerHTML=isNaN(a)?'Impossible triangle!':''
       calc()
     }
   }

   function CalcCircArea() {
     var r=$t('CircDiameter')/2
     var a=Math.PI*r*r
     $('IArea').value=$('CArea').innerHTML=isNaN(a)?'-':Math.round(a*100)/100
     calc()
   }

   function CalcOvalArea() {
     var l=$t('OvalLength')
     var h=$t('OvalHeight')
     var a=Math.PI*l*h/4
     $('IArea').value=$('OArea').innerHTML=isNaN(a)?'-':Math.round(a*100)/100
     calc()
   }

   function CalcHalfOvalArea() {
     var l=$t('HalfOvalLength')
     var h=$t('HalfOvalHeight')
     var a=Math.PI*l*h/4
     $('IArea').value=$('HArea').innerHTML=isNaN(a)?'-':Math.round(a*100)/100
     calc()
   }

    function KD(e,id){
      if(!e) ev=window.event
      else ev=e
      if(ev.keyCode)    keyCode=ev.keyCode
      else if(ev.which) keyCode=ev.which
      if(id=='FK' && keyCode==TAB && !ev.shiftKey) {
        ev.returnValue=false
        $('tbCell').focus()
        $('tbCell').select()
      }
    } //KD

    function clearInputs(){
      if(confirm('Clear Inputs?')) {
        $('FN').value=$('FP').value=$('FK').value=''
        $('IArea').value=1000
        $('Rec').innerHTML=''
        $('FN').focus(); $('FN').select()
      }
    } //clearInputs

function UpdateFert() {
  var U,W,N,P,K,sn,sp,sk,rn,rp,rk,sc,best
  var g1={}
  var g2={}
  var g3={}

  var nr=-1
  var r =[]
  var gn=[]
  var gp=[]
  var gk=[]
  var ts=[]

  function dbpush(s){
    if(Debug) db.push(s)
  }

  function doRound(v){
    v*=100

    if     ($('IR1').checked) {dec=1; mult=10}
    else if($('IR2').checked) {dec=2; mult=4}
    else if($('IR3').checked) {dec=1; mult=2}
    else if($('IR4').checked) {dec=0; mult=1}
    return (((mult*v).toFixed(0))/mult).toFixed(dec)
  } //doRound

  function CalcNRate(fn,fp,fk) {
    var r

    if(dP && fp>0) return 0
    if(dK && fk>0) return 0

    if(rn*fn>0) r=doRound(rn/fn)
    else r=0

    sn+=r*fn/100; rn-=r*fn/100
    sp+=r*fp/100; rp-=r*fp/100
    sk+=r*fk/100; rk-=r*fk/100

    return r
  }  //CalcNRate

  function CalcPRate(fn,fp,fk) {
    var r

    if(dN && fn>0) return 0
    if(dK && fk>0) return 0

    if(rp*fp>0) r=doRound(rp/fp)
    else r=0

    sn+=r*fn/100; rn-=r*fn/100
    sp+=r*fp/100; rp-=r*fp/100
    sk+=r*fk/100; rk-=r*fk/100

    return r
  } //CalcPRate

  function CalcKRate(fn,fp,fk) {
    var r

    if(dN && fn>0) return 0
    if(dP && fp>0) return 0

    if(rk*fk>0) r=doRound(rk/fk)
    else r=0

    sn+=r*fn/100; rn-=r*fn/100
    sp+=r*fp/100; rp-=r*fp/100
    sk+=r*fk/100; rk-=r*fk/100

    return r
  } //CalcKRate

  function rpd(v1,v2){
    v1*=1; v2*=1
    if(v1==0 && v2==0) return 0
    var r=Math.abs(v1-v2)/((v1+v2)/2)
    return r
  } //rpd

  function CalcScore() {
    if(sn+sp+sk==0) return 0
    var sc=100

    if(N>0 && sn==0)                       sc-=25
    else if(N>0 && (sn<0.9*N || sn>1.1*N)) sc-=10*rpd(sn,N)
    else                                   sc-= 5*rpd(sn,N)

    if(P>0 && sp==0)                       sc-=25
    else if(sp>P*1.05)                     sc-=20*rpd(sp,P)
    else                                   sc-=10*rpd(sp,P)

    if(K>0 && sk==0)                       sc-=25
    else if(sk<K)                          sc-=20*rpd(sk,K)
    else                                   sc-=10*rpd(sk,K)

    if(sc<0) sc=0
//        if(sn>=0.9*N && sn<=1.1*N) sc++
//        if(sp>=0.9*P && sp<=1.1*P) sc++
//        if(sk>=0.9*K && sk<=1.1*K) sc++
    if(sc>100) sc=100
    return sc
  } //CalcScore

  function SD(n,b){
    b=b?'border-left:1px solid black':''
    n=n.toFixed(2)
    if(n=='-0.00') n='0.00'
    if     (n>0) return '<th style="'+b+';color:red">'+n
    else if(n<0) return '<th style="'+b+';color:blue">'+-n
    else         return '<th style="'+b+';color:green">'+n
  } //SD

  var pN=$t('FN')
  var pP=$t('FP')
  var pK=$t('FK')

  for(var i=j=0;i<Grades.length;i++) if(Grades[i].length==3) {
    gn[j]=Grades[i][0]*1; gp[j]=Grades[i][1]*1; gk[j]=Grades[i][2]*1
    j++
  }

  if($t('IArea')=='') $('IArea').value=1

  Area=$t('IArea')

  U=$t('SqAc')
  if(U=='square feet') {
    N=(pN/(43.56*1000/Area)).toFixed(2)
    P=(pP/(43.56*1000/Area)).toFixed(2)
    K=(pK/(43.56*1000/Area)).toFixed(2)
  }
  else {
    N=(pN*Area).toFixed(0)
    P=(pP*Area).toFixed(0)
    K=(pK*Area).toFixed(0)
  }

  W=$t('wgt')
  if(W=='ounces') {
    N*=16
    P*=16
    K*=16
  }

  var db=[]
  var gotN=[]
  var gotP=[]
  var gotK=[]

  for(var i0=0;i0<3;i0++) {  //get N, P, K
    for(var i1=0;i1<gn.length;i1++) if(gn[i1]>=0) {
      for(var i2=0;i2<gn.length;i2++) if(Comb<2 || (i2!=i1 && gn[i2]>=0)) {
        for(var i3=0;i3<gn.length;i3++) if(Comb<3 || (i3!=i1 && i3!=i2 && gn[i3]>=0)) {
//      alert(i1+'\r'+i2)

          dN=dP=dK=false

          var bs=0
          ts[bs]=-999

          var ind=(i1+1)*10000+(i2+1)*100+(i3+1)*1
          var costfactor=$v('SCost')=='pound'?1:1/2000

          g1.n=gn[i1]; g1.p=gp[i1]; g1.k=gk[i1]; g1.c=cost[i1]*costfactor
          g2.n=gn[i2]; g2.p=gp[i2]; g2.k=gk[i2]; g2.c=cost[i2]*costfactor
          g3.n=gn[i3]; g3.p=gp[i3]; g3.k=gk[i3]; g3.c=cost[i3]*costfactor

          if     (Comb<2) g2.r=g2.c=g3.r=g3.c=0
          else if(Comb<3) g3.r=g3.c=0

          var rec= calc3(g1.n,g2.n,g3.n,N,
                         g1.p,g2.p,g3.p,P,
                         g1.k,g2.k,g3.k,K
                        );
          if(Comb===3 && rec[0]>=0 && rec[1]>=0 && rec[2]>=0) {
            rn= rp= rk= 0;
            g1.r= rec[0];
            g2.r= rec[1];
            g3.r= rec[2];
            ts[1]= 100;
          }

          rn=N*1; rp=P*1; rk=K*1
          sn=0; sp=0; sk=0
          g1.r=            CalcNRate(g1.n,g1.p,g1.k)
          if(Comb>1)  g2.r=CalcPRate(g2.n,g2.p,g2.k)
          if(Comb>2)  g3.r=CalcKRate(g3.n,g3.p,g3.k)
          ts[1]=CalcScore()
          if(!gotN['1'+ind] && ts[1]>ts[bs]) bs=1

          rn=N*1; rp=P*1; rk=K*1
          sn=0; sp=0; sk=0
          g1.r=            CalcNRate(g1.n,g1.p,g1.k)
          if(Comb>1)  g2.r=CalcKRate(g2.n,g2.p,g2.k)
          if(Comb>2)  g3.r=CalcPRate(g3.n,g3.p,g3.k)
          ts[2]=CalcScore()
          if(!gotN['1'+ind] && ts[2]>ts[bs]) bs=2

          rn=N*1; rp=P*1; rk=K*1
          sn=0; sp=0; sk=0
          g1.r=            CalcPRate(g1.n,g1.p,g1.k)
          if(Comb>1)  g2.r=CalcKRate(g2.n,g2.p,g2.k)
          if(Comb>2)  g3.r=CalcNRate(g3.n,g3.p,g3.k)
          ts[3]=CalcScore()
          if(!gotP['2'+ind] && ts[3]>ts[bs]) bs=3

          rn=N*1; rp=P*1; rk=K*1
          sn=0; sp=0; sk=0
          g1.r=            CalcPRate(g1.n,g1.p,g1.k)
          if(Comb>1)  g2.r=CalcNRate(g2.n,g2.p,g2.k)
          if(Comb>2)  g3.r=CalcKRate(g3.n,g3.p,g3.k)
          ts[4]=CalcScore()
          if(!gotP['2'+ind] && ts[4]>=ts[bs]) bs=4

          rn=N*1; rp=P*1; rk=K*1
          sn=0; sp=0; sk=0
          g1.r=            CalcKRate(g1.n,g1.p,g1.k)
          if(Comb>1)  g2.r=CalcPRate(g2.n,g2.p,g2.k)
          if(Comb>2)  g3.r=CalcNRate(g3.n,g3.p,g3.k)
          ts[5]=CalcScore()
          if(!gotK['3'+ind] && ts[5]>=ts[bs]) bs=5

          rn=N*1; rp=P*1; rk=K*1
          sn=0; sp=0; sk=0
          g1.r=            CalcKRate(g1.n,g1.p,g1.k)
          if(Comb>1)  g2.r=CalcNRate(g2.n,g2.p,g2.k)
          if(Comb>2)  g3.r=CalcPRate(g3.n,g3.p,g3.k)
          ts[6]=CalcScore()
          if(!gotK['3'+ind] && ts[6]>ts[bs]) bs=6

//              dbpush('Scores:<ol><li>'+ts.join('<li>')+'</ol>')
          rn=N*1; rp=P*1; rk=K*1
          sn=0; sp=0; sk=0
          if(bs==1) {
            gotN['1'+ind]=dN=true
            g1.r=            CalcNRate(g1.n,g1.p,g1.k)
            if(Comb>1)  g2.r=CalcPRate(g2.n,g2.p,g2.k)
            if(Comb>2)  g3.r=CalcKRate(g3.n,g3.p,g3.k)
          }
          else if(bs==2) {
            gotN['1'+ind]=dN=true
            g1.r=            CalcNRate(g1.n,g1.p,g1.k)
            if(Comb>1)  g2.r=CalcKRate(g2.n,g2.p,g2.k)
            if(Comb>2)  g3.r=CalcPRate(g3.n,g3.p,g3.k)
          }
          else if(bs==3) {
            gotP['2'+ind]=dP=true
            g1.r=            CalcPRate(g1.n,g1.p,g1.k)
            if(Comb>1)  g2.r=CalcKRate(g2.n,g2.p,g2.k)
            if(Comb>2)  g3.r=CalcNRate(g3.n,g3.p,g3.k)
          }
          else if(bs==4) {
            gotP['2'+ind]=dP=true
            g1.r=            CalcPRate(g1.n,g1.p,g1.k)
            if(Comb>1)  g2.r=CalcNRate(g2.n,g2.p,g2.k)
            if(Comb>2)  g3.r=CalcKRate(g3.n,g3.p,g3.k)
          }
          else if(bs==5) {
            gotK['3'+ind]=dK=true
            g1.r=            CalcKRate(g1.n,g1.p,g1.k)
            if(Comb>1)  g2.r=CalcPRate(g2.n,g2.p,g2.k)
            if(Comb>2)  g3.r=CalcNRate(g3.n,g3.p,g3.k)
          }
          else if(bs==6) {
            gotK['3'+ind]=dK=true
            g1.r=            CalcKRate(g1.n,g1.p,g1.k)
            if(Comb>1)  g2.r=CalcNRate(g2.n,g2.p,g2.k)
            if(Comb>2)  g3.r=CalcPRate(g3.n,g3.p,g3.k)
          }

          sc=CalcScore()
          nr++
          r[nr]={}
          r[nr].score=sc

          if(true) {
/*
            dbpush(i1+''+i2+''+i3)
            dbpush((g1.r*1).toFixed(2)+': '+g1.n+'-'+g1.p+'-'+g1.k)
            dbpush((g2.r*1).toFixed(2)+': '+g2.n+'-'+g2.p+'-'+g2.k)
            dbpush((g3.r*1).toFixed(2)+': '+g3.n+'-'+g3.p+'-'+g3.k)
*/
            var j1=i1; var j2=i2; var j3=i3
            if(j2<j1) {var t=g2; g2=g1; g1=t; t=j2; j2=j1; j1=t}
            if(j3<j2) {var t=g3; g3=g2; g2=t; t=j3; j3=j2; j2=t}
            if(j3<j1) {var t=g3; g3=g1; g1=t; t=j3; j3=j1; j1=t}
            if(j2<j1) {var t=g2; g2=g1; g1=t; t=j2; j2=j1; j1=t}
/*
            dbpush('')
            dbpush((g1.r*1).toFixed(2)+': '+g1.n+'-'+g1.p+'-'+g1.k)
            dbpush((g2.r*1).toFixed(2)+': '+g2.n+'-'+g2.p+'-'+g2.k)
            dbpush((g3.r*1).toFixed(2)+': '+g3.n+'-'+g3.p+'-'+g3.k)

            dbpush('<hr>')
*/
          }

          if(g1.r*1+g2.r*1+g3.r*1>0) {
            var un=[]

            r[nr].grades=[g1.n+'-'+g1.p+'-'+g1.k,
                          g2.n+'-'+g2.p+'-'+g2.k,
                          g3.n+'-'+g3.p+'-'+g3.k
                         ].sort().join('')

            if(sn<0.8*N) un.push('nitrogen')
            if(sp<0.8*P) un.push('phosphorus')
            if(sk<0.8*K) un.push('potassium')
            if(un.length) {
              r[nr].s='<td style="background:#ddd;text-align:left"><i style="color:gray;font-size:90%">More '+un.join(' and ')+' needed.</i><br>'
//              sc-=20
              if(sc<0) sc=0
              r[nr].score=sc
            }
            else
              r[nr].s='<td style="text-align:left">'

            var price=true

            if(g1.r>0) {
              if(g1.c==0) price=false
              r[nr].s+='<b>'+g1.r+'</b> '+W+' of <b>'+g1.n+'-'+g1.p+'-'+g1.k+'</b>'
            }

            if(g2.r>0) {
              if(g2.c==0) price=false
              if(g1.r*1>0) r[nr].s+=' plus<br>'
              r[nr].s+='<b>'+g2.r+'</b> '+W+' of <b>'+g2.n+'-'+g2.p+'-'+g2.k+'</b>'
            }

            if(g3.r>0) {
              if(g3.c==0) price=false
              if(g1.r*1+g2.r*1>0) r[nr].s+=' plus<br>'
              r[nr].s+='<b>'+g3.r+'</b> '+W+' of <b>'+g3.n+'-'+g3.p+'-'+g3.k+'</b>'
            }

            if(g1.r*1+g2.r*1+g3.r*1>0) {
              r[nr].s+='<br>per '+Area+' '+U+'.'

              if(price) r[nr].s+='<td><span class="english">$</span>'+(g1.r*g1.c+g2.r*g2.c+g3.r*g3.c).toFixed(2)
              else      r[nr].s+='<td>&ndash;'

              r[nr].s+='<td style="border-left:1px solid black">'+sn.toFixed(2)+'<td>'+sp.toFixed(2)+'<td>'+sk.toFixed(2)
              r[nr].s+=SD(N-sn,true)+SD(P-sp)+SD(K-sk)
              r[nr].s+='<th style="border-left:1px solid black">'+sc.toFixed(0)
            }

          }
        }
      }
    }
  } //end for

  var b=[]
  b.push('<table cellspacing=0 cellpadding=0 style="width:100%;text-align:center">')
  b.push('<tr class="TRHead">')
  b.push('<th colspan="9">Fertilizer recommendations based on<br>available grades, application rate, and area')

  b.push('<tr valign="bottom" style="background:#def">')
  b.push('<th rowspan="2" style="width:20em">Recommendation')
  b.push('<th rowspan="2">Cost')
  b.push('<th colspan="3" style="border-left:1px solid black">Nutrients supplied<br>per rate and area')
  b.push('<th colspan="3" style="border-left:1px solid black">Nutrients<br><span style="color:blue">surplus</span> or <span style="color:red">deficit</span>')
  b.push('<th rowspan="2" style="border-left:1px solid black">Score')
  b.push('<tr style="background:#def"><th style="border-left:1px solid black">N<th>P<sub>2</sub>O<sub>5</sub><th>K<sub>2</sub>O<th style="border-left:1px solid black">N<th>P<sub>2</sub>O<sub>5</sub><th>K<sub>2</sub>O')
  if(ShowAll) {
    for(var i=0;r[i+1];i++) if(isNaN(r[i].score)) r[i].score=0

    Swapped=true
    while(Swapped) {
      Swapped=false
      for(var i=0;r[i+1];i++)
        if     (r[i].score<r[i+1].score)                     {Swapped=true; var t=r[i]; r[i]=r[i+1]; r[i+1]=t}
        else if(r[i].score==r[i+1].score && r[i].s<r[i+1].s) {Swapped=true; var t=r[i]; r[i]=r[i+1]; r[i+1]=t}
    }

    var goodscore=false
    var used=[]
    var limit= 75;
    for(var i=0;r[i];i++) if(r[i].s && !used[r[i].grades] && (i==0 || r[i].s!=r[i-1].s)) {
      used[r[i].grades]=true

      goodscore=goodscore || r[i].score>=limit;
      if(!goodscore || r[i].score>=limit) b.push('<tr>'+r[i].s) //+'<br>'+r[i].grades)
    }
  }
  else {
    for(var i=1,best=0;r[i];i++) if(r[i].score>r[best].score) best=i
    if(r[best].score>0) b.push('<tr>'+r[best].s)
  }
  b.push('</table>')
  if(N*1+P*1+K*1==0) b=['No fertilizer needed']
  else if(b.length==0) b=['No fertilizer recommended for this area using these grades']
  $('Rec').innerHTML=b.join('')
  Show('DResults')
  $('DDebug').innerHTML='<hr>'+db.join('<br>')
} //UpdateFert

    function updateSqAc(){
      if($t('SqAc')=='acre') {
        $('IArea').value=1
        Hide('CalcArea')
      }
      else {
        $('IArea').value=1000
        Show('CalcArea')
      }
    } //updateSqAc

    var sto=null
    function calc(){
      ShowAll=$('IShow').checked

      if($('IRec2').checked) {
        var g=$v('IGrade').split('-')
        $('FN').value=($v('num')*43.56*g[0]/100).toFixed(2)
        $('FP').value=($v('num')*43.56*g[1]/100).toFixed(2)
        $('FK').value=($v('num')*43.56*g[2]/100).toFixed(2)
        if(isNumber($t('FN')) && isNumber($t('FP')) && isNumber($t('FK'))) {
          $('NRec').innerHTML=$('FN').value
          $('PRec').innerHTML=$('FP').value
          $('KRec').innerHTML=$('FK').value
        }
        else {
          $('NRec').innerHTML=
          $('PRec').innerHTML=
          $('KRec').innerHTML=''
        }
      }

      $('Rec').innerHTML='<i style="color:gray">Enter recommendations from soil test report above.</i>'
      var n=$v('FN')*$v('IArea')
      var p=$v('FP')*$v('IArea')
      var k=$v('FK')*$v('IArea')

      fact=$t('SqAc')=='square feet'?43.56*1000:1
      if($t('wgt')=='ounces') fact/=16
      var max=Math.max(n/fact,p/fact,k/fact)
      var dec,mult

      if     (max>100) dec=0
      else if(max>10)  dec=1
      else             dec=2

      var cn=$('CN').innerHTML=(n/fact).toFixed(dec)
      var cp=$('CP').innerHTML=(p/fact).toFixed(dec)
      var ck=$('CK').innerHTML=(k/fact).toFixed(dec)

      if(isNaN(cn)) $('CN').innerHTML='-'
      if(isNaN(cp)) $('CP').innerHTML='-'
      if(isNaN(ck)) $('CK').innerHTML='-'
      if(isNaN(cn) || isNaN(cp) || isNaN(ck)) return

      $('app').innerHTML=$t('wgt')+' per '+$t('IArea')+' '+$t('SqAc')

      getGrades()
      Comb=Math.min(Grades.length,$t('SComb'))

      if(Grades.length>0) {
        UpdateFert()

        clearTimeout(sto)
        sto=setTimeout(function(){
                         var Rec=$('IRec1').checked?$v('FN')+' '+$v('FP')+' '+$v('FK')+' pounds per acre':$v('num')+' pounds '+$v('IGrade')+' per 1000 square feet'
                         var Referrer=""
                         var G=Grades.join('; ').replace(/,/g,'-')
                         var C=cost.join('; ')
/*
                         obs('insert into FertCalc ([Date] , Rec       , Grades  , Costs   , Area                                                , Use             , IP        , Referrer       , City               , State     ) '+
                             '            values   (now    , "'+Rec+'" , "'+G+'" , "'+C+'" , "'+$v('wgt')+' per '+$v('IArea')+' '+$v('SqAc')+' " , '+$v('SComb')+' , "182.18.238.71" , "'+Referrer+'" , "'+clientCity()+'" , "'+clientState()+'")'
                            )
*/
                       },
                       3000
                      )
      }
    } //calc

    function getGrades(){
      Grades=[]; cost=[]
      var tr=$('TGrades').getElementsByTagName('TR')
      for(var i=1;i<tr.length;i++) {
        var c=innerText(tr[i].cells[0]).split('-')
        if(c.length==3) {
          Grades.push(c)
          cost.push(innerText(tr[i].cells[1]))
        }
      }
      return Grades.length
    } //getGrades

    function Validate(){
      if     ($('IRec1').checked && $t('FN')+$t('FP')+$t('FK')==0)       {alert('Please enter fertilizer requirements in Step 1.'); return false}
      else if($('IRec2').checked && ($t('num')=='' || $t('IGrade')=='')) {alert('Please enter fertilizer requirements in Step 1.'); return false}
      else if(getGrades()==0)                                            {alert('Please select grades in Step 2.'); return false}
      else return true
    } //Validate
