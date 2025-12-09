import { GoogleGenAI } from "@google/genai";

const apiKey = process.env.API_KEY || '';
// Note: In a real production build, ensure API_KEY is handled securely.
// For this demo, we assume the environment variable is injected.

let ai: GoogleGenAI | null = null;

try {
    if (apiKey) {
        ai = new GoogleGenAI({ apiKey });
    }
} catch (error) {
    console.warn("Gemini API Key missing or invalid.");
}

export const generateVideoSummary = async (videoTitle: string, channelContext: string): Promise<string> => {
  if (!ai) return "Resumo indisponível (API Key não configurada).";

  try {
    const model = 'gemini-2.5-flash';
    const prompt = `Gere um resumo curto, envolvente e atrativo (máximo de 3 linhas) para um novo vídeo do YouTube com o título "${videoTitle}" do canal "${channelContext}". O tom deve ser profissional e instigante.`;

    const response = await ai.models.generateContent({
      model: model,
      contents: prompt,
    });

    return response.text || "Confira este novo episódio incrível!";
  } catch (error) {
    console.error("Error generating summary:", error);
    return "Confira este novo episódio incrível! (Erro ao gerar resumo IA)";
  }
};

export const generateNetworkAnalysis = async (podcastsData: string): Promise<string> => {
    if (!ai) return "Sistema Offline. Conecte a API Key para análise em tempo real.";

    try {
        const model = 'gemini-2.5-flash';
        const channels = `
            Canais do Ecossistema:
            1. 16.15 Podcast (Espiritualidade): https://www.youtube.com/@1615PODCAST
            2. Parada Obrigatória (Automobilismo): https://www.youtube.com/@paradaobrigatoria16.15
            3. Excelentíssimo (Direito): https://www.youtube.com/@ExcelentissimoPodcast
            4. NaCativa (Esporte): https://www.youtube.com/@NaCativaCast
            5. PodCofrinho (Finanças): https://www.youtube.com/@podcofrinho
            6. Inspiracast (Histórias): https://youtube.com/@inspiracast16.15
            7. Lábios e Labirintos (Diversidade): https://youtube.com/@ninateixera
            8. Ubuntu Cast (Comunicação): https://www.youtube.com/@UbuntuCast16.15
            9. Cicatrizes (Superação): https://www.youtube.com/@cicatrizesqueviramasas
        `;

        const prompt = `
            Atue como um Head de Inteligência de Mercado e Estratégia para o grupo de mídia '16.15 Studios'.
            
            Dados atuais da rede:
            ${podcastsData}

            Contexto dos Canais:
            ${channels}

            Gere um RELATÓRIO EXECUTIVO DE MÍDIA (Executive Media Report) para potenciais grandes investidores.
            O texto deve ser curto, sofisticado e focado em 'Business Value'.
            
            Estrutura da resposta (sem formatação markdown complexa, texto corrido elegante):
            1. **Análise de Ecossistema**: Comente sobre a diversidade da audiência (Esporte, Direito, Fé, Finanças) e o poder de alcance cruzado.
            2. **Oportunidade Comercial**: Por que uma marca deve investir nesse grupo agora? (Fale sobre retenção e nichos qualificados).
            3. **Projeção**: Uma frase curta sobre o potencial de expansão.

            Máximo de 70 palavras. Tom: Forbes, Bloomberg, Profissional Sênior.
        `;

        const response = await ai.models.generateContent({
            model: model,
            contents: prompt,
        });

        return response.text || "Análise de mercado indisponível no momento.";
    } catch (error) {
        console.error("Error generating analysis:", error);
        return "Erro na conexão com inteligência de mercado.";
    }
}