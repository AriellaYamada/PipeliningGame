//TODO: determinar exatamente como vai ser a interface entre o javascript e a página do jogo, e implementá-la

const LS_INSTR = 0; 			// flag para indicar que a instrução é load/store
const AL_INSTR = 1; 			// flag das instruções aritméticas/lógicas
const NOOP_INSTR = 2;			// flag para a instrução noop

const N_REGISTERS = 8;			// número de registradores
const MAX_IMMEDIATE_VAL = 100;	// valor máximo que um valor imediato numa instrução pode assumir

const LS_INSTR_NAMES = ["sw", "lw", "sb", "lb"];	// nomes de instruções load/store
const AL_INSTR_NAMES = ["add", "sub", "addu", "subu", "mult", "multu", "div", "divu", "mul", "and", "or", "nor", "xor", "sll", "srl", "sra", "addi", "addiu", "andi", "ori", "xori"];						  // nomes de instruções ariméticas/lógicas

// Retorna id de um registrador aleatório. Intervalo [0, N_REGISTERS-1].
function random_register()
{
	return Math.floor(Math.random() * N_REGISTERS);
}

// Retorna nome de uma instrução load/store aleatória.
function random_ls_name()
{
	return LS_INSTR_NAMES[Math.floor(Math.random() * LS_INSTR_NAMES.length)];
}

// Retorna o nome de uma instrução aritmética/lógica aleatória.
function random_al_name()
{
	return AL_INSTR_NAMES[Math.floor(Math.random() * AL_INSTR_NAMES.length)];
}

// Retorna um valor imediato aleatório para ser usado pelas instruções load/store
// e as versões imediatas de algumas instruções aritméticas/lógicas (addi, andi...)
// Retorna valores no intervalo [0, MAX_IMMEDIATE_VAL].
// Retorna sempre múltiplos de 4 pois 4 bytes é o tamanho da palavra do Assembly MIPS,
// assembly no qual as instruções geradas são baseados.
function random_immediate()
{
	return 4 * Math.floor(Math.random() * ((MAX_IMMEDIATE_VAL/4)+1));
}

//Dado o nome de uma instrução AL, retorna true se ela usa valor imediato como parâmetro
// (tipo I) e false caso contrário
function is_immediate(instr_name)
{
	if (instr_name == "addiu" || instr_name.charAt(instr_name.length - 1) == "i")
		return true;
	return false;
}

function Instr(type)
{
	this.type = type;	//LS_INSTR (0) ou AL_INSTR (1)

	if (type == LS_INSTR)
	{
		this.name = random_ls_name();
		this.regdst = random_register();		// loads: registrador onde será armazenado o conteúdo da memória, stores: registrador cujo conteúdo será gravado na memória
		this.regsrc1 = random_register();		// registrador base para a posição de memória
		this.immediate = random_immediate();	// valor imediato que representa o deslocamento a partir da base para acessar a memória
	}
	else if (type == AL_INSTR)
	{
		this.name = random_al_name();
		this.regdst = random_register();		// registrador onde será armazenado o resultado
		this.regsrc1 = random_register();		// registrador do primeiro parâmetro
		if (is_immediate(this.name))
		{
			this.immediate = random_immediate();	// imediato do segundo parâmetro
		}
		else
		{
			this.regsrc2 = random_register();		// registrador do segundo parâmetro
		}
	}
	else
		this.name = "noop";

	// Constrói a string completa da instrução.
	this.getString = function()
	{
		let ret;
		if (this.type == LS_INSTR)
		{
			ret = this.name + " R" + this.regdst + ", " + this.immediate + "(R" + this.regsrc1 + ")";
		}
		else if (this.type == AL_INSTR)
		{
			if (is_immediate(this.name))
				ret = this.name + " R" + this.regdst + ", R" + this.regsrc1 + ", " + this.immediate;
			else
				ret = this.name + " R" + this.regdst + ", R" + this.regsrc1 + ", R" + this.regsrc2;
		}
		else if (this.type == NOOP_INSTR)
			ret = this.name;

		return ret;
	}
}

function generate_instr(){
	var html = '';
	for (var i = 0; i < 20; i++) {
		var instr = new Instr(Math.floor(Math.random() * 3));
		html += '<tr><td>' + i + '</td><td>' + instr.getString() + '</td></tr>';
	}
	console.log(html);
	$('#instructions').html(html);
}

function clear_instr() {
	document.getElementById('instructions').innerHTML = '';
}
