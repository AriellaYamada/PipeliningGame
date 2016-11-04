function Graph(nv)
{
	this.n = nv;					// quantidade de vértices 
	this.adj = [];					// matriz de adjacência
	for (let i = 0; i < nv; i++)
	{
		this.adj.push([]);
		for (let j = 0; j < nv; j++)
		{
			this.adj[i].push(false);
		}
	}

	this.addEdge = function(u, v)
	{
		this.adj[u][v] = true;
	}

	this.realdfs = function(u, vis, visited)
	{
		vis[u] = true;
		visited.push(u);
		for (let i = 0; i < this.n; i++)
		{
			if (this.adj[u][i] && !vis[i])
				this.realdfs(i, vis, visited);
		}
	}

	this.dfs = function(u)
	{
		let vis = [];		// vetor que marca os visitados
		let visited = [];	// vetor de retorno que vai conter os índices dos nós visitados
		vis.length = this.n;
		vis.fill(false);

		this.realdfs(u, vis, visited);
		return visited;
	}
}

