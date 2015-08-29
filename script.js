	var path = new Array;
	var pathI = -1;
	var turns = -1;
	var player;
	function menu()
	{
		var code = '<div id="topBack"></div><div id="midbar"></div><div id="bottomBack"></div><div id="startBut"><button id="mb" onClick="startg()">Play</button></div>';
		document.body.innerHTML = code;
	}
	function fadeOut(el){
  		el.style.opacity = 1;
  		(function fade() {
    		if ((el.style.opacity -= .1) < 0) {
      			el.style.display = 'none';
      			el.classList.add('is-hidden');
		    } else {
      		requestAnimationFrame(fade);
    		}
  		})();
	}
	function winz(txt)
	{
		hide_notif();
		document.getElementById('msg').style.display = "block";
		document.getElementById('msg').innerHTML = txt + '</br></br><a href="">Play Again</a>';
	}
	function slideClosed(el){
		var elem = document.getElementById(el);
		elem.style.transition = "height 0.5s linear 0s";
		elem.style.height = "0px";
	}
	function slideleft(el){
		var elem = document.getElementById(el);
		elem.style.transition = "width 0.5s linear 0s";
		elem.style.width = "0px";
	}
	function slideTop(el){
		var elem = document.getElementById(el);
		elem.style.transition = "top 0.7s ease-in 0s";
		elem.style.top = "-1000px";
	}
	function slideOut(el){
		var elem = document.getElementById(el);
		elem.style.transition = "bottom 1.3s ease-out 0s";
		elem.style.bottom = "-1000px";
	}
	function abv()
	{
		document.getElementById('mb').style.opacity = "0";

	}
	function shown(txt)
	{
		document.getElementById('Notif').style.display = "block"
		document.getElementById('Notif').innerHTML = txt;
		setTimeout('hide_notif()',2000);
	}
	function hide_notif()
	{
		document.getElementById('Notif').style.display = "none";
	}
	function startg()
	{
		slideClosed('mb');
		setTimeout('abv()',500);
		setTimeout('slideleft("midbar")',500);
		setTimeout('slideTop("topBack")',1000);
		setTimeout('slideOut("bottomBack")',1000);
		setTimeout('start()',1500);
	}
	function stop()
	{
		for(var i=0; i<8; i++)
		{
			for(var j=0; j<8; j++)
			{
				var c = document.getElementById(i+""+j).children;
				if(c[0] != undefined )  document.getElementById(i+""+j).disabled = true;
			}
		}
	}
	function check()
	{
		var pl;
		var co = 0;
		for(var i=0; i<8; i++)
		{
			for(var j=0; j<8; j++)
			{
				var c = document.getElementById(i+""+j).children;
				if(c[0] != undefined ) if(c[0].innerHTML == "king") 
					{
						pl = c[0].id;
						co++;
					}
			}
		}
		if(pl == "white") pl = "White"; else pl = "Black";
		if(co < 2) {
			winz(pl + " wins!");
			stop();
		}
	}
	function disableOp()
	{
		var op = (player == 1)?"black":"white";
		for(var i=0; i<8; i++)
		{
			for(var j=0; j<8; j++)
			{
				var c = document.getElementById(i+""+j).children;
				if(c[0] != undefined ) if(c[0].id == op) document.getElementById(i+""+j).disabled = true;
			}
		}
	}
	function enableP()
	{
		var p = (player == 1)?"white":"black";
		for(var i=0; i<8; i++)
		{
			for(var j=0; j<8; j++)
			{
				var c = document.getElementById(i+""+j).children;
				if(c[0] != undefined ) if(c[0].id == p) document.getElementById(i+""+j).disabled = false;
			}
		}
	}
	function showTurn()
	{
		if(++turns % 2 == 0) 
		{
			shown("White's Turn !!");
			player = 1;
		}
		else {
			shown("Black's Turn !!");
			player = 2;
		}
		/*enableP();
		disableOp();*/
	}
	function setPath(id, pos)
	{
		document.getElementById(id).style.borderRadius = "10px";
		document.getElementById(id).style.background = "rgba(100,0,250,0.5)";
		document.getElementById(id).setAttribute("onClick", "step(this,'"+pos+"')");
	}
	function setKill(id, pos)
	{
		document.getElementById(id).style.borderRadius = "10px";
		document.getElementById(id).style.background = "rgba(200,0,0,0.5)";
		document.getElementById(id).setAttribute("onClick", "step(this,'"+pos+"')");
	}
	function resetPath()
	{
		for(var i=0; i<path.length; i++)
		{
			document.getElementById(path[i]).style.background = "transparent";
			document.getElementById(path[i]).setAttribute("onClick","play(this)");
		}
		path = new Array();
		pathI = -1;
	}
	function step(event,pos)
	{
		event.innerHTML = document.getElementById(pos).innerHTML;
		document.getElementById(pos).innerHTML = "";
		showTurn();
		resetPath();
		check();
	}
	function showPath(pos, piece, ptype)
	{
		resetPath();
		var movement, op;
		var p = (player == 1)?"white":"black";
		if(ptype != p) return;
		switch(ptype)
		{
			case 'white':
				movement = 'd';
				op = "black";
				break;
			case 'black':
				movement = 'u';
				op = "white";
				break;
		}
		switch(piece)
		{
			case "pawn":
			var v = parseInt(pos[0]);
			var h = parseInt(pos[1]);
			if(movement == 'd') v = v+1; else v = v-1;
			if(document.getElementById(v+""+(h-1)) != null && document.getElementById(v+""+(h-1)).children.length > 0)
			{ 
				var c = document.getElementById(v+""+(h-1)).children;
				if(c[0].id == op)
				{
					setKill(v+""+(h-1), pos);
					path[++pathI] = v+""+(h-1);
				}
			}
			if(document.getElementById(v+""+(h+1)) != null && document.getElementById(v+""+(h+1)).children.length > 0)
			{ 
				var c = document.getElementById(v+""+(h+1)).children;
				if(c[0].id == op)
				{
					setKill(v+""+(h+1), pos);
					path[++pathI] = v+""+(h+1);
				}
			}
				if(document.getElementById(v+""+h) != null && document.getElementById(v+""+h).children.length <= 0)
				{
					path[++pathI] = v+""+h;
					setPath(v+""+h, pos);
					if(parseInt(pos[0]) == 1 && movement == 'd')
					{
						if(document.getElementById(v+1+""+h) != null && document.getElementById(v+1+""+h).children.length <= 0)
						{
							setPath(v+1+""+h,pos);
							path[++pathI] = v+1+""+h;
						}
					}
					else if(parseInt(pos[0]) == 6 && movement == 'u')
					{
						if(document.getElementById(v-1+""+h) != null && document.getElementById(v-1+""+h).children.length <= 0)
						{
							setPath(v-1+""+h,pos);
							path[++pathI] = v-1+""+h;
						}
					}
			}

			break;

			case "rook":
			var v = parseInt(pos[0]);
			var h = parseInt(pos[1]);
			var i = 1;
			//down
			if(v != 7) {
				var c = document.getElementById(v+i+""+h).children;
				while(c.length <= 0)
				{
					setPath(v+i+""+h, pos);
					path[++pathI] = v+i+""+h;
					v = v+i;
					if(v == 7) break;
					c = document.getElementById(v+i+""+h).children;
				}
				if(v != 7)
				{
					if(c[0].id == op) {
						setKill(v+i+""+h, pos);
						path[++pathI] = v+i+""+h;
					}
				}
			}
			//up
			var v = parseInt(pos[0]);
			var h = parseInt(pos[1]);
			if(v != 0) {
				var c = document.getElementById(v-i+""+h).children;
				while(c.length <= 0)
				{
					setPath(v-i+""+h, pos);
					path[++pathI] = v-i+""+h;
					v = v-i;
					if(v == 0) break;
					c = document.getElementById(v-i+""+h).children;
				}
				if(v != 0) {
					if(c != undefined && c[0].id == op) {
						setKill(v-i+""+h, pos);
						path[++pathI] = v-i+""+h;
					}
				}
			}
			//right
			var v = parseInt(pos[0]);
			var h = parseInt(pos[1]);
			if(h != 7) {
				var c = document.getElementById(v+""+(h+1)).children;
				while(c.length <= 0)
				{
					setPath(v+""+(h+1), pos);
					path[++pathI] = v+""+(h+1);
					h = h+1;
					if(h == 7) break;
					c = document.getElementById(v+""+(h+1)).children;
				}
				if(h != 7)
				{
					if(c[0].id == op) {
						setKill(v+""+(h+1), pos);
						path[++pathI] = v+""+(h+1);
					}
				}
			}
			//left
			var v = parseInt(pos[0]);
			var h = parseInt(pos[1]);
			if(h != 0) {
				var c = document.getElementById(v+""+(h-1)).children;
				while(c.length <= 0)
				{
					setPath(v+""+(h-1), pos);
					path[++pathI] = v+""+(h-1);
					h = h-1;
					if(h == 7) break;
					c = document.getElementById(v+""+(h-1)).children;
				}
				if(h != 0)
				{
					if(c[0].id == op) {
						setKill(v+""+(h-1), pos);
						path[++pathI] = v+""+(h-1);
					}
				}
			}
			break;
			
			case "elpt":
			var v = parseInt(pos[0]);
			var h = parseInt(pos[1]);
			var i = 1;
			//down-left
			if(v != 7 && h != 0) {
				var c = document.getElementById(v+i+""+(h-1)).children;
				while(c.length <= 0)
				{
					setPath(v+i+""+(h-1), pos);
					path[++pathI] = v+i+""+(h-1);
					v = v+i;
					h = h-i;
					if(v == 7) break;
					if(h == 0) break;
					c = document.getElementById(v+i+""+(h-1)).children;
				}
				if(v != 7 && h != 0)
				{
					if(c[0].id == op) {
						setKill(v+i+""+(h-1), pos);
						path[++pathI] = v+i+""+(h-1);
					}
				}
			}
			//down-rigth
			var v = parseInt(pos[0]);
			var h = parseInt(pos[1]);
			if(v != 7 && h != 7) {
				var c = document.getElementById(v+i+""+(h+1)).children;
				while(c.length <= 0)
				{
					setPath(v+i+""+(h+1), pos);
					path[++pathI] = v+i+""+(h+1);
					v = v+i;
					h = h+i;
					if(v == 7) break;
					if(h == 7) break;
					c = document.getElementById(v+i+""+(h+1)).children;
				}
				if(v != 7 && h != 7)
				{
					if(c[0].id == op) {
						setKill(v+i+""+(h+1), pos);
						path[++pathI] = v+i+""+(h+1);
					}
				}
			}

			//up-left

			var v = parseInt(pos[0]);
			var h = parseInt(pos[1]);
			if(v != 0 && h != 0) {
				var c = document.getElementById(v-i+""+(h-1)).children;
				while(c.length <= 0)
				{
					setPath(v-i+""+(h-1), pos);
					path[++pathI] = v-i+""+(h-1);
					v = v-i;
					h = h-i;
					if(v == 0) break;
					if(h == 0) break;
					c = document.getElementById(v-i+""+(h-1)).children;
				}
				if(v != 0 && h != 0)
				{
					if(c[0].id == op) {
						setKill(v-i+""+(h-1), pos);
						path[++pathI] = v-i+""+(h-1);
					}
				}
			}
			//up-rigth
			var v = parseInt(pos[0]);
			var h = parseInt(pos[1]);
			if(v != 0 && h != 7) {
				var c = document.getElementById(v-i+""+(h+1)).children;
				while(c.length <= 0)
				{
					setPath(v-i+""+(h+1), pos);
					path[++pathI] = v-i+""+(h+1);
					v = v-i;
					h = h+i;
					if(v == 0) break;
					if(h == 7) break;
					c = document.getElementById(v-i+""+(h+1)).children;
				}
				if(v != 0 && h != 7)
				{
					if(c[0].id == op) {
						setKill(v-i+""+(h+1), pos);
						path[++pathI] = v-i+""+(h+1);
					}
				}
			}
			break;


			case "qwin":
			var v = parseInt(pos[0]);
			var h = parseInt(pos[1]);
			var i = 1;
			//down
			if(v != 7) {
				var c = document.getElementById(v+i+""+h).children;
				while(c.length <= 0)
				{
					setPath(v+i+""+h, pos);
					path[++pathI] = v+i+""+h;
					v = v+i;
					if(v == 7) break;
					c = document.getElementById(v+i+""+h).children;
				}
				if(v != 7)
				{
					if(c[0].id == op) {
						setKill(v+i+""+h, pos);
						path[++pathI] = v+i+""+h;
					}
				}
			}
			//up
			v = parseInt(pos[0]);
			h = parseInt(pos[1]);
			if(v != 0) {
				var c = document.getElementById(v-i+""+h).children;
				while(c.length <= 0)
				{
					setPath(v-i+""+h, pos);
					path[++pathI] = v-i+""+h;
					v = v-i;
					if(v == 0) break;
					c = document.getElementById(v-i+""+h).children;
				}
				if(v != 0) {
					if(c != undefined && c[0].id == op) {
						setKill(v-i+""+h, pos);
						path[++pathI] = v-i+""+h;
					}
				}
			}
			//right
			v = parseInt(pos[0]);
			h = parseInt(pos[1]);
			if(h != 7) {
				var c = document.getElementById(v+""+(h+1)).children;
				while(c.length <= 0)
				{
					setPath(v+""+(h+1), pos);
					path[++pathI] = v+""+(h+1);
					h = h+1;
					if(h == 7) break;
					c = document.getElementById(v+""+(h+1)).children;
				}
				if(h != 7)
				{
					if(c[0].id == op) {
						setKill(v+""+(h+1), pos);
						path[++pathI] = v+""+(h+1);
					}
				}
			}
			//left
		 	v = parseInt(pos[0]);
			h = parseInt(pos[1]);
			if(h != 0) {
				var c = document.getElementById(v+""+(h-1)).children;
				while(c.length <= 0)
				{
					setPath(v+""+(h-1), pos);
					path[++pathI] = v+""+(h-1);
					h = h-1;
					if(h == 0) break;
					c = document.getElementById(v+""+(h-1)).children;
				}
				if(h != 0)
				{
					if(c[0].id == op) {
						setKill(v+""+(h-1), pos);
						path[++pathI] = v+""+(h-1);
					}
				}
			}
			v = parseInt(pos[0]);
			h = parseInt(pos[1]);
			i = 1;
			//down-left
			if(v != 7 && h != 0) {
				var c = document.getElementById(v+i+""+(h-1)).children;
				while(c.length <= 0)
				{
					setPath(v+i+""+(h-1), pos);
					path[++pathI] = v+i+""+(h-1);
					v = v+i;
					h = h-i;
					if(v == 7) break;
					if(h == 0) break;
					c = document.getElementById(v+i+""+(h-1)).children;
				}
				if(v != 7 && h != 0)
				{
					if(c[0].id == op) {
						setKill(v+i+""+(h-1), pos);
						path[++pathI] = v+i+""+(h-1);
					}
				}
			}
			//down-rigth
			v = parseInt(pos[0]);
			h = parseInt(pos[1]);
			if(v != 7 && h != 7) {
				var c = document.getElementById(v+i+""+(h+1)).children;
				while(c.length <= 0)
				{
					setPath(v+i+""+(h+1), pos);
					path[++pathI] = v+i+""+(h+1);
					v = v+i;
					h = h+i;
					if(v == 7) break;
					if(h == 7) break;
					c = document.getElementById(v+i+""+(h+1)).children;
				}
				if(v != 7 && h != 7)
				{
					if(c[0].id == op) {
						setKill(v+i+""+(h+1), pos);
						path[++pathI] = v+i+""+(h+1);
					}
				}
			}

			//up-left

			v = parseInt(pos[0]);
			h = parseInt(pos[1]);
			if(v != 0 && h != 0) {
				var c = document.getElementById(v-i+""+(h-1)).children;
				while(c.length <= 0)
				{
					setPath(v-i+""+(h-1), pos);
					path[++pathI] = v-i+""+(h-1);
					v = v-i;
					h = h-i;
					if(v == 0) break;
					if(h == 0) break;
					c = document.getElementById(v-i+""+(h-1)).children;
				}
				if(v != 0 && h != 0)
				{
					if(c[0].id == op) {
						setKill(v-i+""+(h-1), pos);
						path[++pathI] = v-i+""+(h-1);
					}
				}
			}
			//up-rigth
			v = parseInt(pos[0]);
			h = parseInt(pos[1]);
			if(v != 0 && h != 7) {
				var c = document.getElementById(v-i+""+(h+1)).children;
				while(c.length <= 0)
				{
					setPath(v-i+""+(h+1), pos);
					path[++pathI] = v-i+""+(h+1);
					v = v-i;
					h = h+i;
					if(v == 0) break;
					if(h == 7) break;
					c = document.getElementById(v-i+""+(h+1)).children;
				}
				if(v != 0 && h != 7)
				{
					if(c[0].id == op) {
						setKill(v-i+""+(h+1), pos);
						path[++pathI] = v-i+""+(h+1);
					}
				}
			}
			break;
			case "king":
			var v = parseInt(pos[0]);
			var h = parseInt(pos[1]);
			if(v != 0)
			{
				var c = document.getElementById(v-1+""+(h)).children;
				if(c.length == 0) 
				{
					setPath(v-1+""+(h),pos);
					path[++pathI] = v-1+""+h;
				}
				else if(c[0].id == op) {
					setKill(v-1+""+h, pos);
					path[++pathI] = v-1+""+h;
				}
			}
			if(v != 7)
			{
				var c = document.getElementById(v+1+""+(h)).children;
				if(c.length == 0) 
				{
					setPath(v+1+""+(h),pos);
					path[++pathI] = v+1+""+h;
				}
				else if(c[0].id == op) {
					setKill(v+1+""+h, pos);
					path[++pathI] = v+1+""+h;
				}
			}
			if(h != 0)
			{
				var c = document.getElementById(v+""+(h-1)).children;
				if(c.length == 0) 
				{
					setPath(v+""+(h-1),pos);
					path[++pathI] = v+""+(h-1);
				}
				else if(c[0].id == op) {
					setKill(v+""+(h-1), pos);
					path[++pathI] = v+""+(h-1);
				}
			}
			if(h != 7)
			{
				var c = document.getElementById(v+""+(h+1)).children;
				if(c.length == 0) 
				{
					setPath(v+""+(h+1),pos);
					path[++pathI] = v+""+(h+1);
				}
				else if(c[0].id == op) {
					setKill(v+""+(h+1), pos);
					path[++pathI] = v+""+(h+1);
				}
			}
			if(v !=0 && h != 0)
			{
				var c = document.getElementById(v-1+""+(h-1)).children;
				if(c.length == 0) 
				{
					setPath(v-1+""+(h-1),pos);
					path[++pathI] = v-1+""+(h-1);
				}
				else if(c[0].id == op) {
					setKill(v-1+""+(h-1), pos);
					path[++pathI] = v-1+""+(h-1);
				}
			}
			if(v !=0 && h != 7)
			{
				var c = document.getElementById(v-1+""+(h+1)).children;
				if(c.length == 0) 
				{
					setPath(v-1+""+(h+1),pos);
					path[++pathI] = v-1+""+(h+1);
				}
				else if(c[0].id == op) {
					setKill(v-1+""+(h+1), pos);
					path[++pathI] = v-1+""+(h+1);
				}
			}
			if(v !=7 && h != 7)
			{
				var c = document.getElementById(v+1+""+(h+1)).children;
				if(c.length == 0) 
				{
					setPath(v+1+""+(h+1),pos);
					path[++pathI] = v+1+""+(h+1);
				}
				else if(c[0].id == op) {
					setKill(v+1+""+(h+1), pos);
					path[++pathI] = v+1+""+(h+1);
				}
			}
			if(v !=7 && h != 0)
			{
				var c = document.getElementById(v+1+""+(h-1)).children;
				if(c.length == 0) 
				{
					setPath(v+1+""+(h-1),pos);
					path[++pathI] = v+1+""+(h-1);
				}
				else if(c[0].id == op) {
					setKill(v+1+""+(h-1), pos);
					path[++pathI] = v+1+""+(h-1);
				}
			}
			break;

			case "hrse":
			var h = parseInt(pos[1]);
			var v = parseInt(pos[0]);
			if(document.getElementById(v+1+""+(h+2)) != undefined)
			{
				var c = document.getElementById(v+1+""+(h+2)).children;
				if(c.length == 0)
				{
					setPath(v+1+""+(h+2),pos);
					path[++pathI] = v+1+""+(h+2);
				}
				else if(c[0].id == op)
				{
					setKill(v+1+""+(h+2),pos);
					path[++pathI] = v+1+""+(h+2);
				}
			}
			if(document.getElementById(v+1+""+(h-2)) != undefined)
			{
				var c = document.getElementById(v+1+""+(h-2)).children;
				if(c.length == 0)
				{
					setPath(v+1+""+(h-2),pos);
					path[++pathI] = v+1+""+(h-2);
				}
				else if(c[0].id == op)
				{
					setKill(v+1+""+(h-2),pos);
					path[++pathI] = v+1+""+(h-2);
				}
			}
			if(document.getElementById(v-1+""+(h+2)) != undefined)
			{
				var c = document.getElementById(v-1+""+(h+2)).children;
				if(c.length == 0)
				{
					setPath(v-1+""+(h+2),pos);
					path[++pathI] = v-1+""+(h+2);
				}
				else if(c[0].id == op)
				{
					setKill(v-1+""+(h+2),pos);
					path[++pathI] = v-1+""+(h+2);
				}
			}
			if(document.getElementById(v-1+""+(h-2)) != undefined)
			{
				var c = document.getElementById(v-1+""+(h-2)).children;
				if(c.length == 0)
				{
					setPath(v-1+""+(h-2),pos);
					path[++pathI] = v-1+""+(h-2);
				}
				else if(c[0].id == op)
				{
					setKill(v-1+""+(h-2),pos);
					path[++pathI] = v-1+""+(h-2);
				}
			}

			if(document.getElementById(v+2+""+(h+1)) != undefined)
			{
				var c = document.getElementById(v+2+""+(h+1)).children;
				if(c.length == 0)
				{
					setPath(v+2+""+(h+1),pos);
					path[++pathI] = v+2+""+(h+1);
				}
				else if(c[0].id == op)
				{
					setKill(v+2+""+(h+1),pos);
					path[++pathI] = v+2+""+(h+1);
				}
			}
			if(document.getElementById(v+2+""+(h-1)) != undefined)
			{
				var c = document.getElementById(v+2+""+(h-1)).children;
				if(c.length == 0)
				{
					setPath(v+2+""+(h-1),pos);
					path[++pathI] = v+2+""+(h-1);
				}
				else if(c[0].id == op)
				{
					setKill(v+2+""+(h-1),pos);
					path[++pathI] = v+2+""+(h-1);
				}
			}
			if(document.getElementById(v-2+""+(h+1)) != undefined)
			{
				var c = document.getElementById(v-2+""+(h+1)).children;
				if(c.length == 0)
				{
					setPath(v-2+""+(h+1),pos);
					path[++pathI] = v-2+""+(h+1);
				}
				else if(c[0].id == op)
				{
					setKill(v-2+""+(h+1),pos);
					path[++pathI] = v-2+""+(h+1);
				}
			}
			if(document.getElementById(v-2+""+(h-1)) != undefined)
			{
				var c = document.getElementById(v-2+""+(h-1)).children;
				if(c.length == 0)
				{
					setPath(v-2+""+(h-1),pos);
					path[++pathI] = v-2+""+(h-1);
				}
				else if(c[0].id == op)
				{
					setKill(v-2+""+(h-1),pos);
					path[++pathI] = v-2+""+(h-1);
				}
			}
			break;
		}
	}
	function play(event)
	{
		var position = event.id;
		var child = event.children;
		if(child.length <= 0) return;
		var piece = child[0].innerHTML;
		var ptype = child[0].id;
		showPath(position, piece, ptype);
	}
	function drawPieces()
	{
		var wPieces = ["<p id='white' class='piece rook' style='background:url(img/rookw.png) no-repeat center'>rook</p>",
					  "<p id='white' class='piece hrse' style='background:url(img/hrsew.png) no-repeat center'>hrse</p>",
					  "<p id='white' class='piece elpt' style='background:url(img/elptw.png) no-repeat center'>elpt</p>",
					  "<p id='white' class='piece king' style='background:url(img/kingw.png) no-repeat center'>king</p>",
					  "<p id='white' class='piece qwin' style='background:url(img/qwinw.png) no-repeat center'>qwin</p>",
					  "<p id='white' class='piece elpt' style='background:url(img/elptw.png) no-repeat center'>elpt</p>",
					  "<p id='white' class='piece hrse' style='background:url(img/hrsew.png) no-repeat center'>hrse</p>",
					  "<p id='white' class='piece rook' style='background:url(img/rookw.png) no-repeat center'>rook</p>"]
					  ;
		var bPieces = ["<p id='black' class='piece rook' style='background:url(img/rookb.png) no-repeat center'>rook</p>",
					  "<p id='black' class='piece hrse' style='background:url(img/hrseb.png) no-repeat center'>hrse</p>",
					  "<p id='black' class='piece elpt' style='background:url(img/elptb.png) no-repeat center'>elpt</p>",
					  "<p id='black' class='piece king' style='background:url(img/kingb.png) no-repeat center'>king</p>",
					  "<p id='black' class='piece qwin' style='background:url(img/qwinb.png) no-repeat center'>qwin</p>",
					  "<p id='black' class='piece elpt' style='background:url(img/elptb.png) no-repeat center'>elpt</p>",
					  "<p id='black' class='piece hrse' style='background:url(img/hrseb.png) no-repeat center'>hrse</p>",
					  "<p id='black' class='piece rook' style='background:url(img/rookb.png) no-repeat center'>rook</p>"]
					  ;
		for(var i=0; i<8; i++)
		{
			document.getElementById("0"+i).innerHTML = wPieces[i];
			document.getElementById("1"+i).innerHTML = "<p id='white' class='piece pawn' style='background:url(img/pawnw.png)'>pawn</p>";
			document.getElementById("7"+i).innerHTML = bPieces[i];
			document.getElementById("6"+i).innerHTML = "<p id='black' class='piece pawn' style='background:url(img/pawnb.png)'>pawn</p>";
		}
	}
	function init()
	{
		menu();
		//setTimeout("start()",2000);
	}
	function start()
	{
		drawBoard();
		drawPieces();
		showTurn();
	}
	function drawBoard()
	{
		var el = "<p id='Notif'></p><div id='msg'></div><table><tbody>";
		for(var i=0; i<8; i++)
		{
			for(var j=0; j<8; j++)
			{
				if((i+j)%2 == 0) el += "<td  class='boxW'><button id=" + i + "" + j + " onClick='play(this)'></button></td>";
				else el += "<td  class='boxB'><button id=" + i + "" + j + " onClick='play(this)'></button></td>";
			}
			el += "<tr>";
		}
		el += "</tbody></table>";
		document.body.innerHTML = el;
	}
	