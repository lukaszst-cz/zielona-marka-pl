from silnik import q, N


def rng(sheet, col, n=N):
    return f"{q(sheet)}!${col}$2:${col}${n+1}"


def month(sheet, val, date):
    return f'SUMIFS({rng(sheet, val)},{rng(sheet, date)},">="&{{OD}},{rng(sheet, date)},"<="&{{DO}})'


def mcount(sheet, date, extra=""):
    return f'COUNTIFS({rng(sheet, date)},">="&{{OD}},{rng(sheet, date)},"<="&{{DO}}{extra})'


def look(src, key_col_here, src_key, src_val):
    return f'=IFERROR(IF(${key_col_here}{{r}}="","",INDEX({rng(src, src_val)},MATCH(${key_col_here}{{r}},{rng(src, src_key)},0))),"")'
