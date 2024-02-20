export const sorts: any[] = [
	{
		'name': 'Bubble Sort',
		'best-case': 'O(n)',
		'worst-case': 'O(n^2)',
		'average': 'O(n^2)',
		'run': (arr: number[], num_hints: number): any[] => {
			var hints: any[] = [];
			
			const n = arr.length;
			for (let i = 0; i < n - 1; i++) {
				for (let j = 0; j < n - i - 1; j++) {
					if (arr[j] > arr[j + 1]) {
						const temp = arr[j];
						arr[j] = arr[j + 1];
						arr[j + 1] = temp;
						
						hints.push({ 'array': arr.slice(), 'i1': j, 'i2': j + 1 });
						
						if (hints.length === num_hints) {
							return hints;
						}
					}
				}
			}
			
			return hints;
		},
	},
	{
		'name': 'Selection Sort',
		'best-case': 'O(n^2)',
		'worst-case': 'O(n^2)',
		'average': 'O(n^2)',
		'run': (arr: number[], num_hints: number): any[] => {
			var hints: any[] = [];
			
			const n = arr.length;
			for (let i = 0; i < n - 1; i++) {
				let minIndex = i;
				
				for (let j = i + 1; j < n; j++) {
					if (arr[j] < arr[minIndex]) {
						minIndex = j;
					}
				}
				
				if (minIndex !== i) {
					const temp = arr[i];
					arr[i] = arr[minIndex];
					arr[minIndex] = temp;
					
					hints.push({ 'array': arr.slice(), 'i1': i, 'i2': minIndex });
					
					if (hints.length === num_hints) {
						return hints;
					}
				}
			}
			
			return hints;
		},
	},
	{
		'name': 'Insertion Sort',
		'best-case': 'O(n)',
		'worst-case': 'O(n^2)',
		'average': 'O(n^2)',
		'run': (arr: number[], num_hints: number): any[] => {
			var hints: any[] = [];
			
			const n = arr.length;
			for (let i = 1; i < n; i++) {
				const key = arr[i];
				let j = i - 1;
				
				while (j >= 0 && arr[j] > key) {
					arr[j + 1] = arr[j];
					j--;
					
					hints.push({ 'array': arr.slice(), 'i1': j + 1, 'i2': i });
					
					if (hints.length === num_hints) {
						return hints;
					}
				}
				
				arr[j + 1] = key;
				
				hints.push({ 'array': arr.slice(), 'i1': j + 1, 'i2': i });
				
				if (hints.length === num_hints) {
					return hints;
				}
			}
			
			return hints;
		},
	},
	{
		'name': 'Merge Sort',
		'best-case': 'O(n log n)',
		'worst-case': 'O(n log n)',
		'average': 'O(n log n)',
		'run': (arr: number[], num_hints: number): any[] => {
			var hints: any[] = [];
			
			const merge = (arr: number[], left: number, middle: number, right: number) => {
				const n1 = middle - left + 1;
				const n2 = right - middle;
				
				const L = new Array(n1);
				const R = new Array(n2);
				
				for (let i = 0; i < n1; i++) {
					L[i] = arr[left + i];
				}
				
				for (let j = 0; j < n2; j++) {
					R[j] = arr[middle + 1 + j];
				}
				
				let i = 0, j = 0, k = left;
				
				while (i < n1 && j < n2) {
					if (L[i] <= R[j]) {
						arr[k] = L[i];
						i++;
					} else {
						arr[k] = R[j];
						j++;
					}
					
					hints.push({ 'array': arr.slice(), 'i1': left + i, 'i2': middle + 1 + j });
					k++;
					
					if (hints.length === num_hints) {
						return;
					}
				}
			
				while (i < n1) {
					arr[k] = L[i];
					i++; k++;
					
					hints.push({ 'array': arr.slice(), 'i1': left + i, 'i2': k });
					
					if (hints.length === num_hints) {
						return;
					}
				}
				
				while (j < n2) {
					arr[k] = R[j];
					j++; k++;
					
					hints.push({ 'array': arr.slice(), 'i1': middle + 1 + j, 'i2': k });
					
					if (hints.length === num_hints) {
						return;
					}
				}
			}
			
			const mergeSortHelper = (arr: number[], left: number, right: number) => {
				if (left < right) {
					const middle = Math.floor((left + right) / 2);
					
					mergeSortHelper(arr, left, middle);
					mergeSortHelper(arr, middle + 1, right);
					
					merge(arr, left, middle, right);
				}
			};
			
			mergeSortHelper(arr, 0, arr.length - 1);
			
			return hints;
		},
	},
	{
		'name': 'Quick Sort',
		'best-case': 'O(n log n)',
		'worst-case': 'O(n^2)',
		'average': 'O(n log n)',
		'run': (arr: number[], num_hints: number): any[] => {
			var hints: any[] = [];
			
			const partition = (arr: number[], low: number, high: number): number => {
				const pivot = arr[high];
				let i = low - 1;
				
				for (let j = low; j < high; j++) {
					if (arr[j] <= pivot) {
						i++;
						
						const temp = arr[i];
						arr[i] = arr[j];
						arr[j] = temp;
						
						hints.push({ 'array': arr.slice(), 'i1': i, 'i2': j });
						
						if (hints.length === num_hints) {
							return i + 1;
						}
					}
				}
				
				const temp = arr[i + 1];
				arr[i + 1] = arr[high];
				arr[high] = temp;
				
				hints.push({ 'array': arr.slice(), 'i1': i + 1, 'i2': high });
				
				return i + 1;
			};
			
			const quickSortHelper = (arr: number[], low: number, high: number) => {
				if (low < high) {
					const pivotIndex = partition(arr, low, high);
					
					quickSortHelper(arr, low, pivotIndex - 1);
					quickSortHelper(arr, pivotIndex + 1, high);
				}
			};
			
			quickSortHelper(arr, 0, arr.length - 1);
			
			return hints;
		},
	},
	{
		'name': 'Heap Sort',
		'best-case': 'O(n log n)',
		'worst-case': 'O(n log n)',
		'average': 'O(n log n)',
		'run': (arr: number[], num_hints: number): any[] => {
			var hints: any[] = [];
			
			const heapify = (arr: number[], n: number, i: number) => {
				let largest = i;
				const left = 2 * i + 1;
				const right = 2 * i + 2;
				
				if (left < n && arr[left] > arr[largest]) {
					largest = left;
				}
				
				if (right < n && arr[right] > arr[largest]) {
					largest = right;
				}
				
				if (largest !== i) {
					const temp = arr[i];
					arr[i] = arr[largest];
					arr[largest] = temp;
					
					hints.push({ 'array': arr.slice(), 'i1': i, 'i2': largest });
					
					heapify(arr, n, largest);
					
					if (hints.length === num_hints) {
						return;
					}
				}
			};
			
			const heapSort = (arr: number[]) => {
				const n = arr.length;
				
				for (let i = Math.floor(n / 2) - 1; i >= 0; i--) {
					heapify(arr, n, i);
				}
				
				for (let i = n - 1; i > 0; i--) {
					const temp = arr[0];
					arr[0] = arr[i];
					arr[i] = temp;
					
					hints.push({ 'array': arr.slice(), 'i1': 0, 'i2': i });
					
					heapify(arr, i, 0);
					
					if (hints.length === num_hints) {
						return;
					}
				}
			};
			
			heapSort(arr);
			
			return hints;
		},
	},
	{
		'name': 'Radix Sort',
		'best-case': 'O(nk)',
		'worst-case': 'O(nk)',
		'average': 'O(nk)',
		'run': (arr: number[], num_hints: number): any[] => {
			var hints: any[] = [];
			
			const getMax = (arr: number[]): number => {
				let max = arr[0];
				const n = arr.length;
				
				for (let i = 1; i < n; i++) {
					if (arr[i] > max) {
						max = arr[i];
					}
				}
				
				return max;
			};
			
			const countSort = (arr: number[], exp: number): void => {
				const n = arr.length;
				const output = new Array(n);
				const count = new Array(10).fill(0);
				
				for (let i = 0; i < n; i++) {
					count[Math.floor(arr[i] / exp) % 10]++;
				}
				
				for (let i = 1; i < 10; i++) {
					count[i] += count[i - 1];
				}
				
				for (let i = n - 1; i >= 0; i--) {
					const index = Math.floor(arr[i] / exp) % 10;
					output[count[index] - 1] = arr[i];
					count[index]--;
					
					hints.push({ 'array': output.slice(), 'i1': i, 'i2': count[index] });
				}
				
				for (let i = 0; i < n; i++) {
					arr[i] = output[i];
				}
			};
			
			const radixSort = (arr: number[]): void => {
				const max = getMax(arr);
				
				for (let exp = 1; max / exp > 0; exp *= 10) {
					countSort(arr, exp);
				}
			};
			
			radixSort(arr);
			
			return hints;
		},
	},
	{
		'name': 'Counting Sort',
		'best-case': 'O(n + k)',
		'worst-case': 'O(n + k)',
		'average': 'O(n + k)',
		'run': (arr: number[], num_hints: number): any[] => {
			var hints: any[] = [];
			
			const countingSort = (arr: number[], exp: number): void => {
				const n = arr.length;
				const output = new Array(n);
				const count = new Array(10).fill(0);
				
				for (let i = 0; i < n; i++) {
					count[Math.floor(arr[i] / exp) % 10]++;
				}
				
				for (let i = 1; i < 10; i++) {
					count[i] += count[i - 1];
				}
				
				for (let i = n - 1; i >= 0; i--) {
					const index = Math.floor(arr[i] / exp) % 10;
					output[count[index] - 1] = arr[i];
					count[index]--;
					
					hints.push({ 'array': output.slice(), 'i1': i, 'i2': count[index] });
				}
				
				for (let i = 0; i < n; i++) {
					arr[i] = output[i];
				}
			};
			
			const countingSortHelper = (arr: number[]): void => {
				const max = Math.max(...arr);
				
				for (let exp = 1; max / exp > 0; exp *= 10) {
					countingSort(arr, exp);
				}
			};
			
			countingSortHelper(arr);
			
			return hints;
		},
	},
];