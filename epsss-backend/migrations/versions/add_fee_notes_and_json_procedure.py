"""
Add fee_notes as a JSON/Text field and update procedure to store JSON (list of steps) in admissions_content table.
"""
from alembic import op
import sqlalchemy as sa

# revision identifiers, used by Alembic.
revision = 'add_fee_notes_and_json_procedure'
down_revision = 'bb7ddc2cebbe'
branch_labels = None
depends_on = None

def upgrade():
    op.add_column('admissions_content', sa.Column('fee_notes', sa.Text(), nullable=True))
    # No need to alter 'procedure' column type if already Text, but we now store JSON in it.


def downgrade():
    op.drop_column('admissions_content', 'fee_notes')
