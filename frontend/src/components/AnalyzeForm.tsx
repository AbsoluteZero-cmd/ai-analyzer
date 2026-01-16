const AnalyzeForm = ({
	handleFileChange,
	handleTextChange,
	formText,
	handleSubmit,
}) => {
	return (
		<form
			method='POST'
			onSubmit={(e) => handleSubmit(e)}
			className='flex flex-col items-center justify-center mx-auto max-w-2xl bg-yellow-300/10 p-6 my-6 rounded-lg shadow-2xl'
		>
			<div className='flex flex-row w-full gap-2 mb-4'>
				<div className='flex-1 bg-white hover:bg-amber-300/60 transition duration-500 rounded-md text-center py-1 px-4 text-md font-semibold shadow-md'>
					<div className='flex justify-center items-center'>
						<svg
							xmlns='http://www.w3.org/2000/svg'
							fill='none'
							viewBox='0 0 24 24'
							stroke-width='1.5'
							stroke='currentColor'
							class='size-4'
						>
							<path
								stroke-linecap='round'
								stroke-linejoin='round'
								d='m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L6.832 19.82a4.5 4.5 0 0 1-1.897 1.13l-2.685.8.8-2.685a4.5 4.5 0 0 1 1.13-1.897L16.863 4.487Zm0 0L19.5 7.125'
							/>
						</svg>
						<p className='font-bold text-left ml-3 text-sm'>
							Fluent
							<span className='block text-xs text-gray-400 group-hover:text-white font-normal'>
								Lorem ipsum dolor sit amet.
							</span>
						</p>
					</div>
				</div>
				<div className='flex-1 bg-white hover:bg-amber-300/60 transition duration-500 rounded-md text-center py-1 px-4 text-md font-semibold shadow-md'>
					<div className='flex justify-center items-center'>
						<svg
							xmlns='http://www.w3.org/2000/svg'
							fill='none'
							viewBox='0 0 24 24'
							stroke-width='1.5'
							stroke='currentColor'
							class='size-4'
						>
							<path
								stroke-linecap='round'
								stroke-linejoin='round'
								d='M9.53 16.122a3 3 0 0 0-5.78 1.128 2.25 2.25 0 0 1-2.4 2.245 4.5 4.5 0 0 0 8.4-2.245c0-.399-.078-.78-.22-1.128Zm0 0a15.998 15.998 0 0 0 3.388-1.62m-5.043-.025a15.994 15.994 0 0 1 1.622-3.395m3.42 3.42a15.995 15.995 0 0 0 4.764-4.648l3.876-5.814a1.151 1.151 0 0 0-1.597-1.597L14.146 6.32a15.996 15.996 0 0 0-4.649 4.763m3.42 3.42a6.776 6.776 0 0 0-3.42-3.42'
							/>
						</svg>

						<p className='font-bold text-left ml-3 text-sm'>
							Creative
							<span className='block text-xs text-gray-400 group-hover:text-white font-normal'>
								Lorem ipsum dolor sit amet.
							</span>
						</p>
					</div>
				</div>
			</div>
			<textarea
				className='w-full h-48 resize-none p-4 text-sm bg-white rounded-lg shadow-md decoration-0 focus:outline-0'
				name=''
				id=''
				placeholder='Input your text here...'
				onChange={(e) => handleTextChange(e.target.value)}
				value={formText}
			></textarea>
			<div className='flex justify-center items-center gap-2 my-4'>
				<button
					type='submit'
					className='py-2 px-8 bg-yellow-400 text-white font-medium text-sm rounded-lg shadow'
				>
					Summarize
				</button>
				<button
					type='submit'
					className='py-2 px-8 text-yellow-500 font-medium text-sm rounded-lg shadow'
				>
					Humanize
				</button>
			</div>
			<div className='flex justify-between items-start w-full'>
				<p className='flex-1 text-sm text-gray-400'>
					Word count: {formText.length}
				</p>
				<div className='flex-2'>
					<input
						type='file'
						name='fileInput'
						id='fileInput'
						className='bg-white rounded-lg shadow'
						title=' '
						accept='.txt'
						onChange={(e) => handleFileChange(e)}
					/>
					<p className='text-sm text-gray-400'>Supported types: .txt</p>
				</div>
			</div>
		</form>
	);
};

export default AnalyzeForm;
