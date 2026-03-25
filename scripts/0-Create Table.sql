
-- Criação da Tabela de Jogadores (Players)
CREATE TABLE IF NOT EXISTS "Players" (
    "Id" UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    "Username" VARCHAR(50) UNIQUE NOT NULL,
    "CreatedAt" TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP
);

-- Criação da Tabela de Partidas (Matches)
CREATE TABLE IF NOT EXISTS "Matches" (
    "Id" UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    "PlayerXId" UUID NOT NULL,
    "PlayerOId" UUID NOT NULL,
    "WinnerId" UUID NULL, -- Nulo representa empate
    "PlayedAt" TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,
    
    -- Chaves Estrangeiras com proteção contra exclusão em cascata (RESTRICT)
    CONSTRAINT "FK_Matches_PlayerX" FOREIGN KEY ("PlayerXId") 
        REFERENCES "Players"("Id") ON DELETE RESTRICT,
        
    CONSTRAINT "FK_Matches_PlayerO" FOREIGN KEY ("PlayerOId") 
        REFERENCES "Players"("Id") ON DELETE RESTRICT,
        
    CONSTRAINT "FK_Matches_Winner" FOREIGN KEY ("WinnerId") 
        REFERENCES "Players"("Id") ON DELETE RESTRICT
);

CREATE INDEX IF NOT EXISTS "IX_Matches_WinnerId" ON "Matches"("WinnerId");