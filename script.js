document.addEventListener('DOMContentLoaded', function () {
    Chart.register(ChartDataLabels);
    
    const energeticPlayfulPalette = ['#33C4FF', '#FF5733'];

    const tooltipTitleCallback = (tooltipItems) => {
        const item = tooltipItems[0];
        let label = item.chart.data.labels[item.dataIndex];
        if (Array.isArray(label)) {
            return label.join(' ');
        } else {
            return label;
        }
    };
    
    const budgetCtx = document.getElementById('budgetChart').getContext('2d');
    new Chart(budgetCtx, {
        type: 'doughnut',
        data: {
            labels: ['Ações "Lamen"', 'Ações "Massas"'],
            datasets: [{
                label: 'Orçamento',
                data: [40000, 30000],
                backgroundColor: energeticPlayfulPalette,
                borderColor: '#ffffff',
                borderWidth: 4,
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            cutout: '70%',
            layout: {
                padding: 10
            },
            plugins: {
                legend: {
                    position: 'bottom',
                    labels: {
                        font: {
                            size: 14,
                            weight: '600'
                        }
                    }
                },
                tooltip: {
                    callbacks: {
                        title: tooltipTitleCallback,
                        label: function(context) {
                            let value = context.raw;
                            return ` R$ ${value.toLocaleString('pt-BR')}`;
                        }
                    }
                },
                datalabels: {
                    color: '#1f2937',
                    font: {
                        weight: 'bold',
                        size: 16
                    },
                    formatter: (value, context) => {
                        const sum = context.chart.data.datasets[0].data.reduce((a, b) => a + b, 0);
                        const percentage = (value / sum * 100).toFixed(0) + '%';
                        return `R$${value / 1000}k\n(${percentage})`;
                    },
                     textAlign: 'center'
                }
            }
        }
    });

    const downloadButton = document.getElementById('download-pdf');
    if (downloadButton) {
        downloadButton.addEventListener('click', () => {
            const element = document.getElementById('content-to-print');
            const opt = {
                margin: 0.5,
                filename: 'cronograma-dinerama-mdb.pdf',
                image: { type: 'jpeg', quality: 0.98 },
                html2canvas: { scale: 2, useCORS: true },
                jsPDF: { unit: 'in', format: 'a4', orientation: 'portrait' },
                pagebreak: { mode: ['css', 'avoid-all'], before: '.page-break-before' }
            };
            
            html2pdf().from(element).set(opt).save();
        });
    }
});
