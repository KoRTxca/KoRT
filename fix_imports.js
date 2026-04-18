import fs from 'fs';
import path from 'path';

function walkDir(dir, callback) {
    fs.readdirSync(dir).forEach(f => {
        let dirPath = path.join(dir, f);
        let isDirectory = fs.statSync(dirPath).isDirectory();
        isDirectory ? walkDir(dirPath, callback) : callback(path.join(dir, f));
    });
}

walkDir('./src', function(filePath) {
    if (filePath.endsWith('.js') || filePath.endsWith('.jsx')) {
        let content = fs.readFileSync(filePath, 'utf8');
        let orig = content;
        
        // Fix useWatch
        content = content.replace(/['"]\.\.\/hooks\/useWatch['"]/g, "'../hooks/usewatch'");
        
        // Fix merlinClient
        content = content.replace(/['"]\.\.\/\.\.\/api\/merlinClient['"]/g, "'../../api/merlinclient'");
        
        // Fix SovereignLLM
        content = content.replace(/['"]\.\.\/lib\/SovereignLLM['"]/g, "'../lib/sovereignllm'");
        
        // Fix AnthropicLLM
        content = content.replace(/['"]\.\.\/lib\/AnthropicLLM['"]/g, "'../lib/anthropicllm'");
        
        // Fix GrokLLM
        content = content.replace(/['"]\.\.\/lib\/GrokLLM['"]/g, "'../lib/grokllm'");
        
        // Fix base44Client
        content = content.replace(/['"]\.\.\/api\/base44Client['"]/g, "'../api/base44client'");
        
        // Fix ClaudeStyles.css
        content = content.replace(/['"]\.\/ClaudeStyles\.css['"]/g, "'./claudestyles.css'");
        
        // Fix sosbutton
        content = content.replace(/['"]\.\.\/components\/sosbutton['"]/g, "'../components/SOSButton'");
        
        // Fix watchstatus
        content = content.replace(/['"]\.\.\/components\/watchstatus['"]/g, "'../components/WatchStatus'");
        
        // Fix responderdashboard
        content = content.replace(/['"]\.\.\/components\/responderdashboard['"]/g, "'../components/ResponderDashboard'");
        
        // Fix modulematrix
        content = content.replace(/['"]\.\.\/components\/dashboard\/modulematrix['"]/g, "'../components/dashboard/ModuleMatrix'");
        
        if (content !== orig) {
            fs.writeFileSync(filePath, content, 'utf8');
            console.log('Fixed', filePath);
        }
    }
});
