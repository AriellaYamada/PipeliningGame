const MAX_CLOCKS = 50	// Maior número de clocks que uma sequência de instruções poderá ocupar

function maior_que_1(valor)
{
	return valor > 1;
}

// Nas funções abaixo o parâmetro v deve ser um array com instruções

function verifica_estrutural(v)
{
	let mem = [];	// a cada i associa quantas vezes a memória foi acessada no clock i
	let reg = [];	// a cada i associa quantas vezes o banco de registradores foi acessado no clock i

	mem.length = MAX_CLOCKS;
	reg.length = MAX_CLOCKS;
	mem.fill(0);
	reg.fill(0);

	for (let i = 0; i < v.length; i++)
	{
		if (v[i].type != NOOP_INSTR)
		{
			mem[i]++;		// usado pelo primeiro estágio, Instruction Fetch (todas as instruções)
			reg[i+1]++;		// usado pelo segundo estágio, Instruction Decore/Register (todas as instruções)

			if (v[i].type == AL_INSTR || v[i].name.charAt(0) == 'l')
			{
				reg[i+4]++;		// todas as instruções AL e os loads usam o quinto estágio, Write Back
			}
			if (v[i].type == LS_INSTR)
			{
				mem[i+3]++;		// todas as instruções LS usam o quarto estágio, Memory Access
			}
		}
	}

	if (mem.some(maior_que_1) || reg.some(maior_que_1)){
		console.log('OK');
		return false;
	}
	console.log('Hazards estruturais encontrados');
	return true;
}

function verifica_dados(v)
{
	for (let i = 0; i < v.length; i++)
	{
		let r1 = -1, r2 = -1;
		let timeneed = i + 1;
		if ("regsrc1" in v[i])
			r1 = v[i].regsrc1;
		if ("regsrc2" in v[i])
			r2 = v[i].regsrc2;

		for (let j = i-1; j >= 0; j--)
		{
			if ("regdst" in v[j])
			{
				let timeready = j + 4;
				if ((v[j].regdst == r1 || v[j].regdst == r2) && timeready >= timeneed)
					return false;

			}
		}
	}
	return true;
}
