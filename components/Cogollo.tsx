/*
 * El cogollo de la marca: el dibujo del cliente (public/assets/img/logo-cogollo.svg) simplificado para que se lea
 * desde 16px. Misma silueta y espinas, engrosadas; sin la hoja central, los nervios ni la línea del tallo; 7 de las 31
 * escamas, en zigzag y más gruesas. Generado con la misma geometría que public/assets/img/logo-cogollo-simple.svg.
 *
 * Es una máscara: lo blanco se ve y lo negro (las escamas) queda hueco, así la marca toma el color del texto.
 */
export const COGOLLO_VIEWBOX = "78 15 344 474";

export function CogolloMascara() {
  return (
    <>
      <path d="M244 77C242 59 219 51 223 27C210 51 225 66 229 84C216 87 210 96 211 108C196 111 188 122 190 137C174 146 169 160 172 175C158 185 154 202 159 216C142 226 136 242 141 258C125 267 121 282 125 296C110 311 108 328 116 343C103 357 108 380 125 388C122 409 143 424 163 420C173 440 196 443 213 432C224 438 231 445 230 456L226 478C236 474 249 474 260 479L257 454C255 441 262 430 272 424C291 437 312 430 321 416C344 423 362 409 365 391C389 388 399 369 391 352C405 336 400 318 388 309C399 291 388 271 372 264C375 245 364 229 347 225C352 204 342 188 327 183C331 165 322 151 307 147C311 129 298 115 283 114C282 94 266 78 249 78L244 77Z" fill="#fff" stroke="#fff" strokeWidth="12" strokeLinejoin="round" />
      <path d="M174 243C151 234 141 214 139 196C137 180 132 165 119 151C140 157 154 169 161 184L167 176L170 196L178 190V211L186 207L185 230L174 243Z" fill="#fff" stroke="#fff" strokeWidth="12" strokeLinejoin="round" />
      <path d="M297 216L294 191L301 196L302 177L309 184L315 161L320 171L330 147L331 170L340 164L336 185L346 180L337 199L346 198L326 216L310 226L297 216Z" fill="#fff" stroke="#fff" strokeWidth="12" strokeLinejoin="round" />
      <path d="M354 324L359 300L365 307L373 287L377 295L389 273V293L403 283L395 305L408 300L396 316L405 317L383 333L359 341L354 324Z" fill="#fff" stroke="#fff" strokeWidth="12" strokeLinejoin="round" />
      <path d="M187 374L162 353L164 363L143 359L148 369L126 371L134 378L112 386L121 389L96 411L128 400L126 408L148 395V404L166 392L168 400L190 390L187 374Z" fill="#fff" stroke="#fff" strokeWidth="12" strokeLinejoin="round" />
      <path d="M308 399L331 400L326 406L347 412L339 417L360 431L349 432L369 457C348 447 336 438 324 428L325 439L311 427L310 435L299 416L308 399Z" fill="#fff" stroke="#fff" strokeWidth="12" strokeLinejoin="round" />
      <path d="M277 120C278 102 292 86 297 67L298 87L305 83L302 97L308 95L300 110H304L291 126L277 120Z" fill="#fff" stroke="#fff" strokeWidth="12" strokeLinejoin="round" />
      <path d="M367 272C369 247 390 229 382 207C401 226 381 257 381 283L367 272Z" fill="#fff" stroke="#fff" strokeWidth="12" strokeLinejoin="round" />
      <path d="M133 299C112 303 98 297 91 282C91 306 110 320 131 316L133 299Z" fill="#fff" stroke="#fff" strokeWidth="12" strokeLinejoin="round" />
      <path d="M279 409C279 434 305 450 303 472C318 449 296 423 295 406L279 409Z" fill="#fff" stroke="#fff" strokeWidth="12" strokeLinejoin="round" />
      <path d="M224 104C226 87.9999 250 85.9999 261 99.9999M275 172C274 154 295 149 307 161M198 207C193 189 215 178 230 187M277 246C291 228 320 233 328 249M176 284C188 268 211 272 219 284M283 344C298 332 319 339 325 353M190 397C173 383 186 362 206 365" fill="none" stroke="#000" strokeWidth="17" strokeLinecap="round" />
    </>
  );
}
