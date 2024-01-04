# Nodejs Automation With Jenkins

Tutorial kali ini saya akan membagikan bagaimana cara membuat CI/CD integration menggunakan Jenkins, yang dimana nanti ketika branch tujuan contoh main, ada yang melakukan commit atau merge request, makan nanti secara otomatis commit or merge request tersebut akan melakukan trigger ke Jenkins dan akan mengirimkan push notification nya ke Slack channel.

# Install Jenkins Plugin

Manage Jenkins -> Plugins -> Available Plugins

1. Install GitLab API Plugin 
2. Install Docker API Plugin Version 
3. SSH Pipeline Step
4. Slack Notification Version 

Setiap setelah menginstall plugins wajib melakukan restart pada Jenkins, centang checkbox restart jenkins.

# Install Slack Plugin

Add Apps -> Apps

1. Install Jenkins CI

# Step By Step Setup Server

1. Sediakan server 1 dan 2 anda bisa membuatnya menggunakan multipass untuk membuat mini server
2. Kemudian install Jenkins di salah satu server contoh server 1
3. Ketika selesai menginstall Jenkins, install docker di ke 2 server 1 dan 2
4. Kemudian install Telabit, di server 1 untuk keperluan mengekpose Jenkins untuk keperluan WebHooks

# Step By Step Setup Gitlab

1. Buat account gitlab terlebih dahulu jika belum memilikinya
2. Kemudian buat repo yang nanti akan digunakan bisa private bisa public, dalam contoh ini saya menggunakan private repo
3. Lihat step by step gambar pada folder images/gitlab
4. Setelah berhasil membuat personnal token, copy token dan buat credentials di jenkins

# Step By Step Setup Slack

1. Buat account slack terlebih dahulu jika belum memilikinya
2. Setelah selesai membuat account slack dan workspace 
3. Kemudian buat channel di slack untuk penamaan nya bebas contoh kalau saya jenkins-bot
4. Lihat step by step gambar pada folder images/slack
5. Setelah berhasil menginstall Jenkin plugin di slack, copy token dan buat credentials di jenkins

# Step By Step Setup Jenkins

1. Setelah berhasil menginstall jenkins, buat username dan password
2. Kemudian coba akses ip local server 1 anda di browser
3. Jika berhasil nanti akan keluar tampilan halaman jenkins
4. Kemudian masukan username dan password yang sebelumnya anda buat
5. Lihat step by step gambar pada folder images/jenkins
