$(function(){


	$(document).on('change', 'input.cgradesel', function(){
    var slGrade = $(this).val();
		var cgc = 0;

			if($(this).is(':checked')){
				var gradeObj = $('table.cgtable tbody tr td:first-child input');
				// console.log(gradeObj);
				$.each(gradeObj, function(key,val){
					if( slGrade == $(val).val()){
						cgc = 1;
					}
				});
				if(cgc == 0){
					$('table.cgtable tbody tr:last-child td:first-child input').val(slGrade);
					$('table.cgtable tbody tr:last-child td:last-child input').val(0);
					$('table.cgtable tbody tr:last-child td:last-child input').addClass("cost-"+slGrade);
					$('table.cgtable tbody').append('<tr><td class="p-1 border"><input type="text" name="sdgrade[]" id="sdgrade[]" class="border-0 bg-white w-100" disabled></td><td class="p-1 border"><input type="text" name="cost[]" id="cost[]" class="border-0 w-100"></td></tr>');
				}
			}else{

				var gradeObj = $('table.cgtable tbody tr td:first-child input');
				// console.log(gradeObj);
				$.each(gradeObj, function(key,val){
					if( slGrade == $(val).val()){
						$(val).parent().parent().remove();
					}
				});
			}


  });

	$('#unit-area').on('change',function(){
		var val = $(this).val();
		if(val == "hectare"){
			$('#area').val("1");
		}else{
			$('#area').val("10000");
		}
	});

	$('.addCustomGrade').on('click',function(){
		var cg = $('.acgrade').val();
		var cgc = 0;
		if(cg != ''){
			var gradeObj = $('table.cgtable tbody tr td:first-child input');

      $.each(gradeObj, function(key,val){
        if( cg == $(val).val()){
          cgc = 1;
        }
      });
			if(cgc == 0){
				$('table.cgtable tbody tr:last-child td:first-child input').val(cg);
				$('table.cgtable tbody tr:last-child td:last-child input').val(0);
				$('table.cgtable tbody tr:last-child td:last-child input').addClass("cost-"+cg);
				$('table.cgtable tbody').append('<tr><td class="p-1 border"><input type="text" name="sdgrade[]" id="sdgrade[]" class="border-0 bg-white w-100" disabled></td><td class="p-1 border"><input type="text" name="cost[]" id="cost[]" class="border-0 w-100"></td></tr>');
				$('.cgradesel-con').append('<input type="checkbox" name="cgrade[]" class="cgradesel cgcustom" value="'+cg+'">'+cg+'<br>');
				var sl = '.cgradesel-con input[value="'+cg+'"]';
				$(sl).prop('checked',true);
				$('.acgrade').val('');
			}

		}
	});


	$('.calculate-button').on('click', function(){
		 $('.recommended-table tbody').empty();
			var fA = [];
			var cA = [];
			var icA = [];
			var sA = [];
			// var cstA = [];
			var tholder = [];
			var inpgrade = $('input[name="sdgrade[]"]');
			// var fertCost = $('input[name="cost[]"]');
			var strec = $('input[name="strec[]"]');

			$.each(inpgrade, function(key,val){

					var grade = $(val).val();
					if(grade != ''){
						var gradesArr = grade.split('-');

						if(gradesArr[0] > 0 && gradesArr[1] > 0 && gradesArr[2] > 0){
							cA.push(grade);
						}else if ((gradesArr[0] > 0 && gradesArr[1] > 0 && gradesArr[2] == 0) || (gradesArr[0] == 0 && gradesArr[1] > 0 && gradesArr[2] > 0) || (gradesArr[0] > 0 && gradesArr[1] == 0 && gradesArr[2] > 0)) {
							icA.push(grade);
						}else{
							sA.push(grade);
						}

					}
			});

			// $.each(fertCost, function(key,val){
			//
			// 		var gradeCst = $(val).val();
			// 		if(gradeCst != ''){
			// 				cstA.push(gradeCst);
			// 		}
			// });

			if(cA != ''){
				$.each(cA, function(x,y){
					fA.push([y]);
					if (icA != '') {
						if(icA.length >= 2){
							var r = 2;
							var n = icA.length;
							getCombination(icA, n, r);
							$.each(remove_duplicates(tholder), function(tt,oo){
								fA.push([y,oo]);
							});
						}
						tholder = [];
						if(sA.length >= 2){
							var r = 2;
							var n = sA.length;
							getCombination(sA, n, r);
							$.each(remove_duplicates(tholder), function(tt,oo){
								fA.push([y,oo]);
							});
						}
						tholder = [];
						$.each(icA, function(xx,yy){
							fA.push([y,yy]);
							$.each(sA, function(xxx,yyy){
								fA.push([y,yy,yyy]);
								// console.log(fA);
							});
						});
						$.each(sA, function(xxx,yyy){
							fA.push([y,yyy]);
						});
					}else{
						if(sA.length >= 2){
							var r = 2;
							var n = sA.length;
							getCombination(sA, n, r);
							$.each(remove_duplicates(tholder), function(tt,oo){
								fA.push([y,oo]);
							});
						}

						tholder = [];

						$.each(sA, function(xxx,yyy){
							fA.push([y,yyy]);
						});
					}
				});
			}

			if(icA != '') {

					$.each(icA, function(xx,yy){
						fA.push([yy]);
						if(sA.length >= 2){
							var r = 2;
							var n = sA.length;
							getCombination(sA, n, r);
							$.each(remove_duplicates(tholder), function(tt,oo){
								fA.push([yy,oo]);
							});
						}
						tholder = [];
						$.each(sA, function(xxx,yyy){
							fA.push([yy,yyy]);

						});
					});
				}



				function printCombination(arr, n, r){
					    var data = [];
							arr.sort();
					    combinationUtil(arr, n, r, 0, data, 0);
					}

				function combinationUtil(arr, n, r,index, data, i){
					    var holder = [];
					    if (index == r){
					        for (j = 0; j < r; j++){
										// console.log(data[j]);
										holder.push(data[j]);
									}

										fA.push(holder);

					    }

					    if (i >= n)
					        return;

					    data[index] = arr[i];
					    combinationUtil(arr, n, r, index + 1, data, i + 1);

							while (arr[i] == arr[i+1]){
								i++;
							}

					    combinationUtil(arr,n, r,index, data, i + 1);

					}

					function getCombination(arr, n, r){
						    var data = [];
								// arr.sort();
						    getCombinationUtil(arr, n, r, 0, data, 0);
						}

					function getCombinationUtil(arr, n, r,index, data, i){
						    var holder = [];
						    if (index == r){
						        for (j = 0; j < r; j++){
											// console.log(data[j]);
											holder.push(data[j]);
										}

											tholder.push(holder);

						    }

						    if (i >= n)
						        return;

						    data[index] = arr[i];
						    getCombinationUtil(arr, n, r, index + 1, data, i + 1);

								// while (arr[i] == arr[i+1]){
								// 	i++;
								// }

						    getCombinationUtil(arr,n, r,index, data, i + 1);

						}

					function remove_duplicates(arr) {
					    var obj = {};
					    var ret_arr = [];
					    for (var i = 0; i < arr.length; i++) {
					        obj[arr[i]] = true;
					    }
					    for (var key in obj) {
					        ret_arr.push(key);
					    }
					    return ret_arr;
					}

			if(cA.length == 2){
				var arr = cA;
				var r = 2;
				var n = arr.length;
				printCombination(arr, n, r);
			}else if (cA.length >= 3) {
				var arr = cA;
				var r = 3;
				var n = arr.length;
				printCombination(arr, n, r);
			}

			if(icA.length == 2){
				var arr = icA;
				var r = 2;
				var n = arr.length;
				printCombination(arr, n, r);
			}else if (icA.length >= 3) {
				var arr = icA;
				var r = 3;
				var n = arr.length;
				printCombination(arr, n, r);
			}

			if(sA.length == 2){
				var arr = sA;
				var r = 2;
				var n = arr.length;
				printCombination(arr, n, r);
			}else if (sA.length >= 3) {
				var arr = sA;
				var r = 3;
				var n = arr.length;
				printCombination(arr, n, r);
			}

			var computeList = remove_duplicates(fA);

				$.each(computeList,function(x,y){
					var cl = y.split(',');
					calculate(cl);
				});


	});

	function calculate(cList){
		// $('.recommended-table').empty();
		var pN = $('#nitrogen').val();
		var pP = $('#phos').val();
		var pK = $('#potas').val();

		if(pN == ""){
			$('#nitrogen').addClass("border border-danger");
		}else{
			$('#nitrogen').removeClass("border border-danger");
		}

		if(pP == ""){
			$('#phos').addClass("border border-danger");
		}else {
			$('#phos').removeClass("border border-danger");
		}

		if(pK == ""){
			$('#potas').addClass("border border-danger");
		}else {
			$('#potas').removeClass("border border-danger");
		}

		var Grades = [];

		var o = 0;
			$.each(cList, function(key,val){
				// console.log(val);
				var gr = val.split('-');
				Grades[o] = gr;
				o++;
			});
			// console.log(Grades);
		var gn = [];
		var gp=[]
		var gk=[]
		var nr=-1
		var r = []

		for(var i=j=0;i<Grades.length;i++) if(Grades[i].length==3) {
			gn[j]=Grades[i][0]*1; gp[j]=Grades[i][1]*1; gk[j]=Grades[i][2]*1
			j++
		}

		var Comb = Grades.length;
		Area=$('#area').val();
		var g1={}
		var g2={}
		var g3={}
		var db=[]
		var gotN=[]
		var gotP=[]
		var gotK=[]
		var ts=[]
		// N=(pN*Area).toFixed(0)
		// P=(pP*Area).toFixed(0)
		// K=(pK*Area).toFixed(0)
		// W = "Kilograms";
		W = $('#unit-weight').val();
		U = $('#unit-area').val();
		UC = $('#unit-cost').val();
		if(U=='square meters') {
			N=(pN/(10000/Area)).toFixed(2);
			P=(pP/(10000/Area)).toFixed(2);
			K=(pK/(10000/Area)).toFixed(2);
		}
		else {
			N=(pN*Area).toFixed(0);
			P=(pP*Area).toFixed(0);
			K=(pK*Area).toFixed(0);
		}

		if(W=='grams') {
			N*=1000
			P*=1000
			K*=1000
		}


		for(var i0=0;i0<3;i0++) {  //get N, P, K
			for(var i1=0;i1<gn.length;i1++) if(gn[i1]>=0) {
				for(var i2=0;i2<gn.length;i2++) if(Comb<2 || (i2!=i1 && gn[i2]>=0)) {
					for(var i3=0;i3<gn.length;i3++) if(Comb<3 || (i3!=i1 && i3!=i2 && gn[i3]>=0)) {
						// console.log(gn[i0]);
						// console.log(gn[i2]);
						dN=dP=dK=false

						var bs=0
						ts[bs]=-999

						var ind=(i1+1)*10000+(i2+1)*100+(i3+1)*1;
						// var costfactor=$v('SCost')=='pound'?1:1/2000

						g1.n=gn[i1]; g1.p=gp[i1]; g1.k=gk[i1];
						g2.n=gn[i2]; g2.p=gp[i2]; g2.k=gk[i2];
						g3.n=gn[i3]; g3.p=gp[i3]; g3.k=gk[i3];

						if     (Comb<2) g2.r=g2.c=g3.r=g3.c=0
						else if(Comb<3) g3.r=g3.c=0

						var rec= calc3(g1.n,g2.n,g3.n,N,
													 g1.p,g2.p,g3.p,P,
													 g1.k,g2.k,g3.k,K
													);
						// if(Comb===3 && rec[0]>=0 && rec[1]>=0 && rec[2]>=0) {
           if(Comb===3){
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
							var j1=i1; var j2=i2; var j3=i3
							if(j2<j1) {var t=g2; g2=g1; g1=t; t=j2; j2=j1; j1=t}
							if(j3<j2) {var t=g3; g3=g2; g2=t; t=j3; j3=j2; j2=t}
							if(j3<j1) {var t=g3; g3=g1; g1=t; t=j3; j3=j1; j1=t}
							if(j2<j1) {var t=g2; g2=g1; g1=t; t=j2; j2=j1; j1=t}
						}

						if(g1.r*1+g2.r*1+g3.r*1>0) {
							var un=[]
							var kgCost = 0;
							var bgCost = 0;
							var costRate = 0;

							r[nr].grades=[g1.n+'-'+g1.p+'-'+g1.k,
														g2.n+'-'+g2.p+'-'+g2.k,
														g3.n+'-'+g3.p+'-'+g3.k
													 ].sort().join('')

							if(sn<0.8*N) un.push('nitrogen')
							if(sp<0.8*P) un.push('phosphorus')
							if(sk<0.8*K) un.push('potassium')
							if(un.length) {
								r[nr].s='More '+un.join(' and ')+' needed.<br>'
	//              sc-=20
								if(sc<0) sc=0
								r[nr].score=sc
							}else{
								r[nr].s=''
							}


							if(g1.r>0) {
								kgCost = kgCost+parseFloat(g1.r);
								bgCost = bgCost+toBagAbs(parseFloat(g1.r),W);
								costRate = costRate+parseFloat($("input.cost-"+g1.n+"-"+g1.p+"-"+g1.k+"").val());
								r[nr].s+='<b>'+g1.r+'</b> '+W+' '+toBag(g1.r,W)+' of <b>'+g1.n+'-'+g1.p+'-'+g1.k+'</b>'
							}

							if(g2.r>0) {
								kgCost = kgCost+parseFloat(g2.r);
								bgCost = bgCost+toBagAbs(parseFloat(g2.r),W);
								costRate = costRate+parseFloat($("input.cost-"+g2.n+"-"+g2.p+"-"+g2.k+"").val());
								if(g1.r*1>0) r[nr].s+=' plus<br>'
								r[nr].s+='<b>'+g2.r+'</b> '+W+' '+toBag(g2.r,W)+' of <b>'+g2.n+'-'+g2.p+'-'+g2.k+'</b>'
							}

							if(g3.r>0) {
								kgCost = kgCost+parseFloat(g3.r);
								bgCost = bgCost+toBagAbs(parseFloat(g3.r),W);
								costRate = costRate+parseFloat($("input.cost-"+g3.n+"-"+g3.p+"-"+g3.k+"").val());
								if(g1.r*1+g2.r*1>0) r[nr].s+=' plus<br>'
								r[nr].s+='<b>'+g3.r+'</b> '+W+' '+toBag(g3.r,W)+' of <b>'+g3.n+'-'+g3.p+'-'+g3.k+'</b>'
							}

							if(g1.r*1+g2.r*1+g3.r*1>0) {

								if(UC == "bag"){
									var fncst = bgCost*costRate;
								}else {
									var fncst = kgCost*costRate;
								}

								r[nr].s+='<br>per '+Area+' '+U+'.'

								r[nr].s+='<td class="border p-1"> P'+Math.round(fncst * 100 + Number.EPSILON ) / 100+''
								r[nr].s+='<td class="border p-1">'+sn.toFixed(2)+'<td class="border p-1">'+sp.toFixed(2)+'<td class="border p-1">'+sk.toFixed(2)
								var nd = Math.round((sn.toFixed(2)-parseFloat(pN)) * 100 + Number.EPSILON ) / 100;
								var pd = Math.round((sp.toFixed(2)-parseFloat(pP)) * 100 + Number.EPSILON ) / 100;
								var kd = Math.round((sk.toFixed(2)-parseFloat(pK)) * 100 + Number.EPSILON ) / 100;
								r[nr].s+='<td class="border p-1">'+nd+'<td class="border p-1">'+pd+'<td class="border p-1">'+kd

								r[nr].s+='<td class="border">'+sc.toFixed(0)
							}
						}




					}
				}
			}
		}

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
				if(!goodscore || r[i].score>=limit) $('.recommended-table tbody').append('<tr class="border"><td class="border p-1">'+r[i].s+'</td></tr>') //+'<br>'+r[i].grades)
			}

			sortTable(8, 'number');

	}


	function sortTable(column, type) {

	  //Get and set order
	  //Use -data to store wheater it will be sorted ascending or descending
	  // var order = $('.recommended-table thead tr>th:eq(' + column + ')').data('order');
		var order = 'ASC';
	  order = order === 'ASC' ? 'DESC' : 'ASC';
	  $('.recommended-table thead tr>th:eq(' + column + ')').data('order', order);

	  //Sort the table
	  $('.recommended-table tbody tr').sort(function(a, b) {
	  //                                 ^  ^
	  //                                 |  |
	  //        The 2 parameters needed to be compared.
	  //        Since you are sorting rows, a and b are <tr>

	    //Find the <td> using the column number and get the text value.
	    //Now, the a and b are the text of the <td>
	    a = $(a).find('td:eq(' + column + ')').text();
	    b = $(b).find('td:eq(' + column + ')').text();

	    switch (type) {
	      case 'text':
	        //Proper way to compare text in js is using localeCompare
	        //If order is ascending you can - a.localeCompare(b)
	        //If order is descending you can - b.localeCompare(a);
	        return order === 'ASC' ? a.localeCompare(b) : b.localeCompare(a);
	        break;
	      case 'number':
	        //You can use deduct to compare if number.
	        //If order is ascending you can -> a - b.
	        //Which means if a is bigger. It will return a positive number. b will be positioned first
	        //If b is bigger, it will return a negative number. a will be positioned first
	        return order === 'ASC' ? a - b : b - a;
	        break;
	      case 'date':
	        var dateFormat = function(dt) {
	          [m, d, y] = dt.split('/');
	          return [y, m - 1, d];
	        }

	        //convert the date string to an object using `new Date`
	        a = new Date(...dateFormat(a));
	        b = new Date(...dateFormat(b));

	        //You can use getTime() to convert the date object into numbers.
	        //getTime() method returns the number of milliseconds between midnight of January 1, 1970
	        //So since a and b are numbers now, you can use the same process if the type is number. Just deduct the values.
	        return order === 'ASC' ? a.getTime() - b.getTime() : b.getTime() - a.getTime();
	        break;
	    }

	  }).appendTo('.recommended-table tbody');
	}

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
	}

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
}

	function doRound(v){
    v*=100

    if ($('#tnt').is(':checked')) {dec=1; mult=10;}
    else if($('#qrt').is(':checked')) {dec=2; mult=4;}
    else if($('#hlf').is(':checked')) {dec=1; mult=2;}
    else if($('#whl').is(':checked')) {dec=0; mult=1;}
		// dec=1; mult=10;
    return (((mult*v).toFixed(0))/mult).toFixed(dec)
  } //doRound

	function rpd(v1,v2){
    v1*=1; v2*=1
    if(v1==0 && v2==0) return 0
    var r=Math.abs(v1-v2)/((v1+v2)/2)
    return r
  }

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
	}

	function toBag(w,W){
		if(W == "grams"){
			w = w/1000;
		}
		var n = w/50;

		// console.log(n);
		if(n>=1){
			if(n%1==0){
				var b = (n<=1)? 'bag':'bags';
				return 'or <b>'+n+'</b> '+b;
			}else{
				var nn = Math.round(n * 100 + Number.EPSILON ) / 100;
				var wpart = (nn+"").split(".")[0];
				var b = (nn<=1)? 'bag':'bags';
				var decPart = (nn+"").split(".")[1];
				var bgkg = (50*decPart)/100;
				return 'or <b>'+wpart+'</b> '+b+' and <b>'+bgkg+'</b> kilograms';
			}
		}else {
			return "";
		}
	}

	function toBagAbs(w,W){
		if(W == "grams"){
			w = w/1000;
		}
		var n = w/50;

			if(n%1==0){
				return n;
			}else{
				var nn = Math.round(n * 100 + Number.EPSILON ) / 100;
				return nn;
			}
	}

});
