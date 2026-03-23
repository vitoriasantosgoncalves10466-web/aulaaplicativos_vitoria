class Personagem {
    constructor(nome, titulo, hp, mana, energia) {
        this.nome = nome;
        this.titulo = titulo;
        this.hp = hp;
        this.mana = mana;
        this.energia = energia;
    }
    atacar(alvo, habilidade) {
        if (this.mana && this.energia >= habilidade.energia) {
            alvo.hp -= habilidade.dano;
            if(habilidade.custo > 0) {
                this.mana -= habilidade.custo;
                this.energia += 50;
            }
            if (habilidade.energia > 0) {
                this.energia = 0;
            }
            return `${this.nome} usou ${habilidade.nome}`;
        } else {
            return `Sem mana ou energia para usar $ {habilidade.nome}`;
        }
    }
}

class Habilidade {
    constructor(id, nome, dano, custo, energia) {
        this.id = id;
        this.nome = nome;
        this.dano = dano;
        this.custo = custo;
        this.energia = energia;
    }
}

// Instanciar (CRIAR) os objetos
let hero = new Personagem("Ector", "O Herói", 100, 100, 0);
let boss =
    new Personagem("Astrogildo", "Elden Beast", 100, 0, 50);

// Preencher Status
document.getElementById("nome-heroi").textContent =
    `${hero.nome}`;
document.getElementById("titulo-heroi").textContent =
    `⚔️${hero.titulo}`;
document.getElementById("nome-boss").textContent =
    `${boss.nome}`;
document.getElementById("titulo-boss").textContent =
    `⚔️${boss.titulo}`;

let constructor = document.getElementById("controles");

const atualizarInterface = (mensagem) =>{

    document.getElementById("hp-hero").value = hero.hp;
    document.getElementById("mp-hero").value = hero.mana;
    document.getElementById("en-hero").value = hero.energia;
}

//vilao
document.getElementById("hp-vilao").value = boss.hp;
document.getElementById("en-vilao").value = boss.energia;

// Criar habilidades e botões
let container = document.getElementById("controles");
let listaHabilidades = [
    new Habilidade(1, "attack", 4, 0, 0),
    new Habilidade(2, "skill", 8, 10, 0),
    new Habilidade(3, "ultimate", 15, 0, 100)
];
listaHabilidades.forEach(hab => {

    let btn = document.createElement("button");
    btn.innerText = hab.nome;
    btn.classList.add("btn", "btn-warning");
    container.appendChild(btn);
    btn.onclick = () => {
        hero.atacar(boss, hab)
        boss.atacar(hero)
    }
});