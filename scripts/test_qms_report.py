import copy
import importlib.util
import tempfile
import unittest
from pathlib import Path

SCRIPT = Path(__file__).resolve().parent / 'qms_report.py'
spec = importlib.util.spec_from_file_location('qms_report', SCRIPT)
module = importlib.util.module_from_spec(spec)
spec.loader.exec_module(module)

BASE = {
    'project_id': 'TEST-001', 'product': 'WWW', 'version': 'abc123', 'report_date': '2026-10-15',
    'release_decision': 'NIE USTALONO',
    'tests': [{'id': 'QA-01', 'criterion': 'Link kontaktowy', 'status': 'PASS', 'method': 'Chromium',
               'evidence': 'https://example.com/evidence', 'performed_at': '2026-10-15', 'tester': 'Reviewer'}]
}

class ReportTests(unittest.TestCase):
    def test_real_pass_generates_pdf(self):
        with tempfile.TemporaryDirectory() as tmp:
            out = Path(tmp) / 'qa.pdf'
            self.assertEqual(module.make_pdf(copy.deepcopy(BASE), out), out)
            self.assertGreater(out.stat().st_size, 4000)
            self.assertEqual(out.read_bytes()[:4], b'%PDF')

    def test_cannot_fabricate_pass(self):
        payload = copy.deepcopy(BASE)
        del payload['tests'][0]['evidence']
        with self.assertRaisesRegex(ValueError, 'evidence'):
            module.validate(payload)

    def test_cannot_release_unchecked(self):
        payload = copy.deepcopy(BASE)
        payload['tests'].append({'id': 'QA-02', 'criterion': 'Odbior', 'status': 'NIE SPRAWDZONO'})
        payload.update({'release_decision': 'GO', 'approved_by': 'Reviewer', 'approval_date': '2026-10-15',
                        'approval_evidence': 'https://example.com/approval'})
        with self.assertRaisesRegex(ValueError, 'GO blokuj'):
            module.validate(payload)

    def test_requires_nd_reason(self):
        payload = copy.deepcopy(BASE)
        payload['tests'] = [{'id': 'QA-02', 'criterion': 'Brak zastosowania', 'status': 'N/D'}]
        with self.assertRaisesRegex(ValueError, 'reason'):
            module.validate(payload)

    def test_rejects_public_destination(self):
        with tempfile.TemporaryDirectory() as tmp:
            path = Path(tmp) / 'public' / 'qa.pdf'
            with self.assertRaisesRegex(ValueError, 'publicznego drzewa'):
                module.make_pdf(copy.deepcopy(BASE), path)

if __name__ == '__main__':
    unittest.main()
