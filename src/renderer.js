const inputFileButton = document.getElementById('input_file_button');
const outputFolderButton = document.getElementById('output_folder_button');
const inputFilePath = document.getElementById('input_file');
const outputFolderPath = document.getElementById('output_folder')

const runButton = document.getElementById('run_button');

inputFileButton.addEventListener('click', async (event) => {
    let path = await window.electronAPI.getFilePath(true);
    inputFilePath.innerText = path;
});

outputFolderButton.addEventListener('click', async (event) => {
    let path = await window.electronAPI.getFilePath(false);
    outputFolderPath.innerText = path;
});

runButton.addEventListener('click', (event) => {
    let params = {
        inputFile: inputFilePath.innerText,
        outputFolder: outputFolderPath.innerText,
        config: {
            general: {
                attack_type: document.getElementById('attack_type').value,
                has_metadata: false,
                max_tiers: document.getElementById('max_tiers').value
            },
            operations: {
                compare_tiers: document.querySelector('input[name="should_compare_tiers"]:checked') ? document.querySelector('input[name="should_compare_tiers"]:checked').value : null,
                get_thresholds: document.querySelector('input[name="should_get_thresholds"]:checked') ? document.querySelector('input[name="should_get_thresholds"]:checked').value : null
            },
            parallel: {
                tiers_parallel_mode: document.getElementById('tiers_parallel') ? document.getElementById('tiers_parallel').value : null,
                thresholds_parallel: document.querySelector('input[name="thresholds_parallel"]:checked') ? document.querySelector('input[name="thresholds_parallel"]:checked').value : null
            },
            breakdown_thresholds: {
                reachable_node_threshold: document.getElementById('reachable_threshold').value,
                breakdown_threshold: document.getElementById('breakdown_threshold').value,
                thinning_ratio: document.getElementById('thinning_ratio').value,
                repeats_per_node: document.getElementById('breakdown_repeats').value
            }
        }
    }

    window.electronAPI.run(params);
});
