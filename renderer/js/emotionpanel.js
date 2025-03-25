export function EmotionPanel(){
    document.addEventListener('DOMContentLoaded', function() {
        let emotionPanel = null;
        const textarea = document.getElementById('text');
        // 情绪选项配置
        const emotions = [
            { display: '😊 Happy', value: '[INST]happy[/INST]' },
            { display: '😢 Sad', value: '[INST]sad[/INST]' },
            { display: '😠 Angry', value: '[INST]angry[/INST]' },
            { display: '😲 Surprised', value: '[INST]surprised[/INST]' },
            { display: '😐 Neutral', value: '[INST]neutral[/INST]' }
        ];

        // 创建表情面板
        function createEmotionPanel() {
            if (emotionPanel) return;

            emotionPanel = document.createElement('div');
            emotionPanel.style.cssText = `
                position: absolute;
                width: 280px;
                background: #ffffff;
                border: 1px solid #e0e0e0;
                border-radius: 8px;
                box-shadow: 0 4px 12px rgba(0,0,0,0.15);
                padding: 15px;
                z-index: 10000;
                display: grid;
                grid-template-columns: repeat(2, 1fr);
                gap: 8px;
                font-family: 'Microsoft YaHei', sans-serif;
                opacity: 0;
                transform: scale(0.95) translate(-50%, -50%);
                transition: all 0.2s ease-out;
                pointer-events: none;
            `;

            // 创建选项按钮
            emotions.forEach(item => {
                const btn = document.createElement('button');
                btn.innerHTML = `
                    <span style="font-size:13px;margin-right:8px">${item.display.split(' ')[0]}
                    ${item.display.split(' ')[1]}
                `;
                btn.dataset.value = item.value;
                btn.style.cssText = `
                    padding: 10px 15px;
                    border: 1px solid #e0e0e0;
                    background: #f9f9f9;
                    cursor: pointer;
                    border-radius: 6px;
                    text-align: left;
                    transition: all 0.2s;
                    display: flex;
                    align-items: center;
                `;
                
                btn.addEventListener('mouseover', () => {
                    btn.style.background = '#f0f0f0';
                    btn.style.transform = 'translateY(-2px)';
                    btn.style.boxShadow = '0 2px 6px rgba(0,0,0,0.1)';
                });
                
                btn.addEventListener('mouseout', () => {
                    btn.style.background = '#f9f9f9';
                    btn.style.transform = 'none';
                    btn.style.boxShadow = 'none';
                });
                
                btn.addEventListener('mousedown', (e) => {
                    e.preventDefault();
                    insertEmotion(btn.dataset.value);
                });

                emotionPanel.appendChild(btn);
            });

            // 关闭按钮
            const closeBtn = document.createElement('button');
            closeBtn.innerHTML = '&times;';
            closeBtn.style.cssText = `
                position: absolute;
                top: 8px;
                right: 12px;
                background: none;
                border: none;
                font-size: 24px;
                cursor: pointer;
                color: #999;
                padding: 0;
                line-height: 1;
            `;
            closeBtn.addEventListener('click', closeEmotionPanel);
            emotionPanel.appendChild(closeBtn);

            document.body.appendChild(emotionPanel);
            positionPanel();
            
            // 启用交互
            setTimeout(() => {
                emotionPanel.style.pointerEvents = 'auto';
                emotionPanel.style.opacity = '1';
                emotionPanel.style.transform = 'scale(1) translate(-50%, -50%)';
            }, 10);
        }

        // 居中定位逻辑
        function positionPanel() {
            if (!emotionPanel) return;
            
            const textareaRect = textarea.getBoundingClientRect();
            const centerX = textareaRect.left + textareaRect.width/2;
            const centerY = textareaRect.top + textareaRect.height/2;
            
            emotionPanel.style.left = `${centerX + window.scrollX}px`;
            emotionPanel.style.top = `${centerY + window.scrollY}px`;
        }

        // 插入标签
        function insertEmotion(value) {
            const start = textarea.selectionStart;
            const end = textarea.selectionEnd;
            
            textarea.value = 
                textarea.value.slice(0, start) + 
                value + 
                textarea.value.slice(end);
            
            const newPos = start + value.length;
            textarea.selectionStart = textarea.selectionEnd = newPos;
            textarea.focus();
            closeEmotionPanel();
        }

        // 关闭面板
        function closeEmotionPanel() {
            if (emotionPanel) {
                emotionPanel.style.opacity = '0';
                emotionPanel.style.transform = 'scale(0.95) translate(-50%, -50%)';
                emotionPanel.style.pointerEvents = 'none';
                setTimeout(() => {
                    document.body.removeChild(emotionPanel);
                    emotionPanel = null;
                }, 200);
            }
        }

        // 快捷键监听
        textarea.addEventListener('keydown', function(e) {
            if (e.ctrlKey && e.key.toLowerCase() === 'm') {
                e.preventDefault();
                emotionPanel ? closeEmotionPanel() : createEmotionPanel();
            }
        });

        // 点击外部关闭
        document.addEventListener('click', function(e) {
            if (emotionPanel && 
                !emotionPanel.contains(e.target) && 
                e.target !== textarea
            ) {
                closeEmotionPanel();
            }
        });

        // ESC键关闭
        document.addEventListener('keydown', function(e) {
            if (e.key === 'Escape' && emotionPanel) {
                closeEmotionPanel();
            }
        });

        // 窗口事件监听
        window.addEventListener('scroll', positionPanel);
        window.addEventListener('resize', positionPanel);
    });
}