import sys, importlib
sys.path.insert(0, ".")
from silnik import build
out = sys.argv[1]
for mod in sys.argv[2:]:
    cfg = importlib.import_module(mod).CFG
    cfg = dict(cfg); cfg["file"] = out + "/" + cfg["file"]
    print(build(cfg))
