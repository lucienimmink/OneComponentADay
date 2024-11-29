export class Loader {
    public async loadAgent(name: string): Promise<string> {
        return await fetch(
            'https://raw.githubusercontent.com/Towmeykaw/clippy-web-component/main/agents/' +
                name +
                '/agent.json'
        ).then((resp) => resp.json());
    }
    public async loadSounds(name: string): Promise<string> {
        return await fetch(
            'https://raw.githubusercontent.com/Towmeykaw/clippy-web-component/main/agents/' +
                name +
                '/sounds-mp3.json'
        ).then((resp) => resp.json());
    }
}
