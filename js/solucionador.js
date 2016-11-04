function permutator(inputArr)
{
	var results = [];

  	function permute(arr, memo) 
	{
    	var cur, memo = memo || [];
		for (var i = 0; i < arr.length; i++)
		{
			cur = arr.splice(i, 1);
			if (arr.length === 0)
       			results.push(memo.concat(cur));

     		permute(arr.slice(), memo.concat(cur));
      		arr.splice(i, 0, cur[0]);
    	}
    	return results;
	}
	return permute(inputArr);
}

function solucao_otima(v)
{
	let vi = [];
	let n = v.length;

	for (let i = 0; i < n; i++)
		vi.push(i);
	
	let p = permutator(vi);
	let sol = undefined;
	for (let i = 0; i < p.length; i++)
	{
		if (verifica_semantica(v, p[i]))
		{
			let vv = [];
			for (let j = 0; j < n; j++)
			{
				vv.push(v[p[i][j]]);
			}
			vv = insere_noops(vv);
			if (sol == undefined || sol.length > vv.length)
				sol = vv;
		}
	}
	return sol;
}
