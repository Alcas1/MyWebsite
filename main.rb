require 'rubygems'
require 'sinatra'
require 'sinatra/base'
require 'pony'
#require 'data_mapper'

#DataMapper::setup(:default, "sqlite3://#{Dir.pwd}/main.db")
#configure do
#  set :currentYear,nil
#end
#
#
#
#
#class Year
#  include DataMapper::Resource
#  property :id, Serial
#  property :number ,Integer
#  property :page_content,Text
#end

#DataMapper.finalize.auto_upgrade!


# class Sinatra::Request
  # def pjax?
    # env['HTTP_X_PJAX'] || self["_pjax"]
  # end
# end

#,:layout => !request.pjax?


class Main < Sinatra::Base
  
  set :public_folder, 'public'
  
  
  
  configure do
    @@error_return = '/about'
  end
  
    
  get '/' do
    @title= 'Jonathan Wu'
    @year_number='Welcome'
    @second_title='to my Site'
    redirect '/start.html'
  end


  post '/' do
    redirect '/about'

  end

  get '/start.html' do
    @title= 'Jonathan Wu'
    @year_number='Welcome'
    @second_title='to my Site'
  end

  post '/start.html' do
    redirect '/about'
  end

  get '/skills' do
    @title= 'Jonathan Wu'
    @year_number='Skills'
    @second_title='Jonathan Wu'
    erb :skills
  end

  post '/skills' do
    
  end


  get '/about' do
 
    @title= 'Jonathan Wu'
    @year_number='About Me'
    @second_title='Jonathan Wu'
    erb :home
  end

  post '/about' do

  end

  get '/betatesters' do
    @title= 'Beta Testers'
    @year_number='Beta Testers'
    @second_title='Thanks'
    erb :betatesters
  end

  post '/betatesters' do

  end

  get '/timeline' do
    @title='Timeline'
    @year_number='Timeline'
    @second_title='Jonathan Wu'
    erb :timeline

  end

  post '/timeline' do

  end

  get '/mentors' do
    @title='Mentors'
    @year_number='Mentors'
    @second_title='Jonathan Wu'
    erb :mentors
  end

  post '/guiders' do

  end

  get '/jeff' do
    @title='Mentors'
    @year_number='Jeff Perlis'
    @second_title='Mentor'
    erb :jeff
  end
  get '/micah' do
    @title='Mentors'
    @year_number='Micah Martin'
    @second_title='Mentor'
    erb :micah
  end
  get '/mike' do
    @title='Mentors'
    @year_number='Mike Ebert'
    @second_title='Mentor'
    erb :mike
  end
  get '/ben' do
    @title='Mentors'
    @year_number='Ben Voss'
    @second_title='Mentor'
    erb :ben
  end

  get '/goals' do

    @title='Goals'
    @year_number='Goals'
    @second_title='Jonathan Wu'
    erb :goals
  end

  post '/goals' do



  end

  get '/projects' do

    @title='My Projects'
    @year_number='Projects'
    @second_title='Jonathan Wu'
    erb :projects
  end

  post '/projects' do


  end
  get '/applets' do
    @title='Applets'
    @year_number='Applets'
    @second_title='Jonathan Wu'
    erb :applets
  end

  post '/applets' do

  end

  get '/github' do

    @title='Github works'
    @year_number='Github'
    @second_title='Jonathan Wu'
    erb :github
  end

  post '/github' do

  end

  get '/ticalc' do
    @title='Ticalc works'
    @year_number='Ticalc'
    @second_title='Jonathan Wu'
    erb :ticalc
  end


  post '/ticalc' do

  end

  get '/apps' do
    @title='Mobile Apps'
    @year_number='Mobile Apps'
    @second_title='Jonathan Wu'
    erb :apps
  end

  post '/apps' do

  end

  get '/music' do
    @title='Music'
    @year_number='My Music'
    @second_title='Jonathan Wu'
    erb :music
  end

  get '/music1' do
    @title='Music'
    @year_number='My Music'
    @second_title='Jonathan Wu'
    erb :music1
  end

  get '/music2' do
    @title='Music'
    @year_number='My Music'
    @second_title='Jonathan Wu'
    erb :music2
  end

  get '/music3' do
    @title='Music'
    @year_number='My Music'
    @second_title='Jonathan Wu'
    erb :music3
  end

  get '/music4' do
    @title='Music'
    @year_number='My Music'
    @second_title='Jonathan Wu'
    erb :music4
  end

  get '/music5' do
    @title='Music'
    @year_number='My Music'
    @second_title='Jonathan Wu'
    erb :music5
  end
  get '/music6' do
    @title='Music'
    @year_number='My Music'
    @second_title='Jonathan Wu'
    erb :music6
  end
  get '/music7' do
    @title='Music'
    @year_number='My Music'
    @second_title='Jonathan Wu'
    erb :music7
  end
  get '/music8' do
    @title='Music'
    @year_number='My Music'
    @second_title='Jonathan Wu'
    erb :music8
  end
  get '/music9' do
    @title='Music'
    @year_number='My Music'
    @second_title='Jonathan Wu'
    erb :music9
  end
  get '/music10' do
    @title='Music'
    @year_number='My Music'
    @second_title='Jonathan Wu'
    erb :music10
  end
  get '/music11' do
    @title='Music'
    @year_number='My Music'
    @second_title='Jonathan Wu'
    erb :music11
  end
  get '/music12' do
    @title='Music'
    @year_number='My Music'
    @second_title='Jonathan Wu'
    erb :music12
  end
  get '/music13' do
    @title='Music'
    @year_number='My Music'
    @second_title='Jonathan Wu'
    erb :music13
  end

  get '/experience' do
    @title='Experience'
    @year_number='Experience'
    @second_title='Jonathan Wu'
    erb :experience
  end

  get '/contact' do
    @title='Contact Me'
    @year_number='Contact Me'
    @second_title='Jonathan Wu'
    erb :contact
  end

  post '/contact' do
    name = params[:name]
    email = params[:email]
    body = params[:body]
    subject=params[:subject]
    Pony.mail(
        :from => params[:name] + "<" + params[:email] + ">",
        :to => 'jonathanwu70@gmail.com',
        :subject => params[:subject],
        :headers => { 'Content-Type' => 'text/html'},
        :body => params[:name] + " has contacted you from " + params[:email]+ "<br />" + params[:body],
        :via => :smtp,
        :via_options => {
            :address              => 'smtp.gmail.com',
            :port                 => '587',
            :enable_starttls_auto => true,
            :user_name            => ENV['EMAIL'],
            :password             => ENV['PASSWORD'],
            :authentication       => :plain,
            :domain               => 'localhost.localdomain'
        })
    redirect '/thanks'
  end

  get '/thanks' do
    @title='Thanks'
    @year_number='Thanks'
    @second_title='Jonathan Wu'
    erb :thanks
  end

  post '/thanks' do
    redirect '/about'
  end

  get '/tictactoe' do
    @title='TicTacToe'
    @year_number='TicTacToe'
    @second_title='Jonathan Wu'
    erb :tictactoe
  end

  post '/tictactoe' do
    redirect'/about'
  end

  get '/tapgame' do
    redirect '/tapgame/index.html'
  end


  get '/towerdefense' do
    redirect '/towerdefense/index.html'
  end

  get '/td' do
    redirect 'towerdefense/index.html'
  end

   get '/restapis' do
    redirect 'RESTAPIs/index.html'
  end

  get '/alexa' do
    redirect 'Alexa/index.html'
  end

  get '/matchgame' do
    redirect 'MatchGame/index.html'
  end

  get '/2014' do
    @year_number='2014'
    @my_age='19'
    @grade='University Freshman'
    @school='Lehigh University'
    @second_title='Jonathan Wu'
    erb :year2014
  end
  
  get '/2013' do
    @year_number='2013'
    @my_age='18'
    @grade='12th'
    @school='Kingswood-Oxford'
    @second_title='Jonathan Wu'
    erb :year2013
  end

  post '/2013' do

  end

  get '/2012' do
    @year_number='2012'
    @my_age='17'
    @grade='11th'
    @school='Kingswood-Oxford'
    @second_title='Jonathan Wu'
    erb :year2012
  end

  post '/2012' do

  end

  get '/2011' do
    @year_number='2011'
    @my_age='16'
    @grade='10th'
    @school = 'Kingswood-Oxford'
    @second_title='Jonathan Wu'
    erb :year2011
  end

  post '/2011' do

  end
  get '/2010' do
    @year_number='2010'
    @my_age='15'
    @grade='9th'
    @school= 'Kingswood-Oxford'
    @second_title='Jonathan Wu'
    erb :year2010
  end

  post '/2010' do

  end

  get '/2009' do
    @year_number='2009'
    @my_age='14'
    @grade='8th'
    @school='Dodd Middle School'
    @second_title='Jonathan Wu'
    erb :year2009
  end

  post '/2009' do

  end
  get '/2008' do
    @year_number='2008'
    @my_age='13'
    @grade='7th'
    @school='Dodd Middle School'
    @second_title='Jonathan Wu'
    erb :year2008
  end

  post '/2008' do

  end
  get '/2007-1995' do
    @year_number='2007-1995'
    @my_age='12'
    @grade='6th'
    @school='Highland Elementary'
    @second_title='Jonathan Wu'
    erb :year20071995
  end

  post '/2007-1995' do

  end
  
  get '/resume' do
    
    redirect '/resume/index.html'
  end
  
  get '/bentley' do
    redirect '/bentley/index.html'
  end
  
  get '/construction' do
    @title='Under Construction'
    @year_number='UNDER CONSTRUCTION'
    @second_title='Jonathan Wu'
    erb :construction
  end
  
  post '/construction' do
    redirect
  end
  
    error 500 do
    @title='Enter An Email'
    @year_number='Enter An Email'
    @second_title='Enter An Email'
    @error_message='Please Enter An Email'
    @@error_return='/contact'
    erb :error
  end
  
  get '/error' do
    redirect @@error_return
  end
  
    
  error 400..499 do
    @title='Error'
    @year_number='Error'
    @second_title='Jonathan Wu'
    @error_message='Something Went Wrong'
    @@error_return='/about'
    erb :error
  end

end