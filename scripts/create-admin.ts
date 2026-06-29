import { createClient } from "@supabase/supabase-js";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY!;

if (!supabaseUrl || !supabaseServiceKey) {
  console.error("Veuillez configurer NEXT_PUBLIC_SUPABASE_URL et SUPABASE_SERVICE_ROLE_KEY dans .env.local");
  process.exit(1);
}

const supabaseAdmin = createClient(supabaseUrl, supabaseServiceKey, {
  auth: {
    autoRefreshToken: false,
    persistSession: false,
  },
});

async function createAdmin() {
  const email = "seftachealphao19@gmail.com";
  const password = "AdminUniqueVoyage2026!";

  console.log(`Création de l'administrateur ${email}...`);

  const { data, error } = await supabaseAdmin.auth.admin.createUser({
    email,
    password,
    email_confirm: true,
  });

  if (error) {
    if (error.message.includes("already registered")) {
      console.log("L'utilisateur existe déjà. Mise à jour du mot de passe...");
      
      // On récupère d'abord l'ID de l'utilisateur
      const { data: usersData, error: listError } = await supabaseAdmin.auth.admin.listUsers();
      if (listError) {
        console.error("Erreur lors de la liste des utilisateurs :", listError);
        return;
      }
      
      const user = usersData.users.find(u => u.email === email);
      if (user) {
        const { error: updateError } = await supabaseAdmin.auth.admin.updateUserById(user.id, {
          password: password,
          email_confirm: true,
        });
        
        if (updateError) {
          console.error("Erreur de mise à jour du mot de passe :", updateError);
        } else {
          console.log("Mot de passe mis à jour avec succès !");
        }
      }
    } else {
      console.error("Erreur :", error.message);
    }
  } else {
    console.log("Administrateur créé avec succès !");
    console.log(`Email : ${email}`);
    console.log(`Mot de passe : ${password}`);
  }
}

createAdmin();
